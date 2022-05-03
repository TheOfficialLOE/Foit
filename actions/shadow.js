import * as fs from "fs";
import isElement from "../util/is-element.js";
import colorPref from "../util/color-settings.js";
import mensch from "mensch";

export default async (path, element, color, options) => {

    if (!path.endsWith(".css"))
        path += ".css";

    if (!element.startsWith(".") && !isElement(element))
        element = "." + element;

    color = colorPref(color, options.size);

    const fileStream = fs.createReadStream(`./${path}`);

    fileStream.on("data", chunk => {

        const ast = mensch.parse(chunk.toString(), {
            comments: true
        });

        let foundSelector = false;

        ast.stylesheet.rules.some(rule => {
            if (rule.type === "rule") {
                if (rule.selectors.includes(element)) {
                    const existingRule = rule.declarations.filter(
                        declaration => declaration.type !== "comment" && declaration.name === "box-shadow"
                    );
                    if (existingRule && existingRule.length) {
                        existingRule[0].value = color;
                    } else {
                        rule.declarations.push({
                            type: 'property',
                            name: 'box-shadow',
                            value: color
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
                selectors: [element],
                declarations: [{
                    type: 'property',
                    name: 'box-shadow',
                    value: color
                }]
            });
        }

        const css = mensch.stringify(ast, {
            comments: true,
            indentation: "\t"
        });

        const writeStream = fs.createWriteStream(`./${path}`);
        writeStream.write(css);
        writeStream.close();
        fileStream.close();

        console.log("Added shadow to " + element);

    });

};