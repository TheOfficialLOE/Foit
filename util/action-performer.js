import * as fs from "fs";
import mensch from "mensch";

const v2ActionPerformer = (fileStream, data) => {

    const ast = data.ast

    let foundSelector = false;

    ast.stylesheet.rules.some(rule => {
        if (rule.type === "rule") {
            if (rule.selectors.includes(data.selector)) {
                const existingRule = rule.declarations.filter(
                    declaration => declaration.type !== "comment" && declaration.name === data.action
                );
                if (existingRule && existingRule.length) {
                    existingRule[0].value = data.value;
                } else {
                    rule.declarations.push({
                        type: 'property',
                        name: data.action,
                        value: data.value
                    });
                }
                foundSelector = true;
                return true
            }
        }
    });

    if (!foundSelector) {
        ast.stylesheet.rules.push({
            type: 'rule',
            selectors: [data.selector],
            declarations: [{
                type: 'property',
                name: data.action,
                value: data.value
            }]
        });
    }

    const css = mensch.stringify(ast, {
        comments: true,
        indentation: "\t"
    });

    const writeStream = fs.createWriteStream(`./${data.path}`);
    writeStream.write(css);
    writeStream.close();
    fileStream.close();

};

export default v2ActionPerformer;