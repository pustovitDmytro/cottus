
import { isObject, isString, fill, isFunction } from 'myrmidon';
import AssemblerError from './errors/AssemblerError';
import { setProp } from './utils';

class ParserVisitor {
    constructor({ data, cache, assembler }) {
        this.data = data;
        this.cache = cache;
        this.assembler = assembler;
    }
    'source'() {
        return [ {
            type        : 'source',
            validators  : this.data.$validate,
            placeholder : this.data.$source
        } ];
    }
    'complex_array'(conf) {
        const cmd = [];

        for (const [ key, value ] of Object.entries(this.data.$validate)) {
            for (const command of this.assembler.parseObject(value, { cache: this.cache })) {
                const prevPath = command.path || [];

                cmd.push({
                    type  : conf.type,
                    inner : {
                        ...command,
                        path : [ key, ...prevPath ]
                    },
                    placeholder : {
                        prefix : conf.prefix
                    },
                    path : [ ]
                });
            }
        }

        return cmd;
    }
    'simple_array'(conf) {
        return [ {
            type        : conf.type,
            validators  : this.data.$validate,
            placeholder : {
                prefix : conf.prefix
            },
            path : [ ]
        } ];
    }
    'placeholder'(conf) {
        return [ {
            type        : 'source',
            validators  : this.data.$validate,
            placeholder : conf.template,
            condition   : conf.if
        } ];
    }
    'constant'() {
        return [ { type: 'constant', data: this.data } ];
    }
    'object'() {
        const commands = [];

        for (const [ key, value ] of Object.entries(this.data)) {
            const cmd = this.assembler.parseObject(value, { cache: this.cache });

            for (const command of cmd) {
                const prevPath = command.path || [];

                commands.push({
                    ...command,
                    path : [ key, ...prevPath ]
                });
            }
        }

        return commands;
    }
}

class CMDVisitor {
    constructor({ command, out, dict, errors, assembler }) {
        this.command = command;
        this.out = out;
        this.dict = dict;
        this.assembler = assembler;
        this.errors = errors;
    }
    run({ path, data, validators, template }) {
        let valid = data;

        if (validators) {
            try {
                const validator = this.assembler._cottus.compile(validators);

                valid = validator.validate(valid);
            } catch (error) {
                return this.errors.push({
                    error,
                    template,
                    path,
                    data
                });
            }
        }

        return setProp(
            this.out,
            path.join('.'),
            valid
        );
    }
    'constant'() {
        return this.run({
            path       : this.command.path,
            data       : this.command.data,
            validators : this.command.validators
        });
    }
    'source'() {
        const data = fill(this.command.placeholder, this.dict);
        const trimmed = this.assembler._options.trim ? data.trim() : data;
        const clean = trimmed === '' ? this.assembler._options.empty : trimmed;

        return this.run({
            path       : this.command.path,
            data       : clean,
            validators : this.command.validators,
            template   : this.command.placeholder
        });
    }
    'simple_array'() {
        const filtered = Object.keys(this.dict)
            .filter(key => key.startsWith(this.command.placeholder.prefix));

        for (let i = 0; ;i++) {
            const prefix = `${this.command.placeholder.prefix}${i}`;
            const key = filtered.find(k => k === prefix);

            if (!key) break;

            this.run({
                path       : [ ...this.command.path, i ],
                data       : this.dict[key],
                validators : this.command.validators,
                template   : prefix
            });
        }
    }
    'complex_array'() {
        const filtered = Object.keys(this.dict)
            .filter(key => key.startsWith(this.command.placeholder.prefix));

        for (let i = 0; ;i++) {
            const prefix = `${this.command.placeholder.prefix}${i}`;
            const keys = filtered.filter(key => key.startsWith(prefix));

            if (keys.length === 0) break;

            const additional = {};

            keys.forEach(key => {
                additional[key.slice(prefix.length)] = this.dict[key];
            });

            this.assembler.executeCMD(
                {
                    ...this.command.inner,
                    path : [ ...this.command.path, i, ...this.command.inner.path ]
                },
                {
                    out    : this.out,
                    dict   : { ...this.dict, ...additional },
                    errors : this.errors
                }
            );
        }
    }
}

export default class Assembler {
    constructor(cottus, schema, options = {}) {
        this._schema = schema;
        this._cottus = cottus;
        this._options = {
            trim  : true,
            empty : null,
            ...options
        };
    }

    parse() {
        this._commands = this.parseObject(this._schema);
    }

    parseObject(data, { cache = [] } = {}) {
        const visitor = new ParserVisitor({ data, cache, assembler: this });

        if (~cache.indexOf(data)) {
            return [];
        }

        cache.push(data);

        if (isObject(data)) {
            if (data.$source) {
                const cmd = [];

                if (isString(data.$source)) {
                    cmd.push(...visitor.source());
                }

                if (isObject(data.$source)) {
                    const conf = data.$source;

                    const type = conf.type || 'placeholder';

                    if (!isFunction(visitor[type])) throw new Error(`Unrecognized source [${type}]`);

                    cmd.push(...visitor[type](conf));
                }

                return cmd;
            }

            return visitor.object();
        }

        return visitor.constant();
    }

    executeCMD(command, { out, dict, errors }) {
        const visitor = new CMDVisitor({ command, out, dict, errors, assembler: this });
        const type = command.type;

        if (!isFunction(visitor[type])) throw new Error(`Unrecognized command [${type}]`);
        visitor[type]();
    }

    run(dict) {
        const out = {};
        const errors = [];

        for (const command of this._commands) {
            this.executeCMD(command, { out, dict, errors });
        }

        if (errors.length > 0) {
            throw new AssemblerError(this._cottus, errors);
        }

        return out;
    }
}
