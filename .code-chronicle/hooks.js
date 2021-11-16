const rules = require('../lib/rules').default;

module.exports = {
    onSection: function(section){
        const ruleClassName = section.values[0].name;
        const rule = rules.find(r=>r.name===ruleClassName);
        section.values[0].id = rule.schema
    }
}