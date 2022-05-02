import * as fs from "fs";
import isElement from "../util/is-element.js";
import colorPref from "../util/color-settings.js";
import shadowAction from "../util/css-action.js";

import mensch from "mensch";

// todo: search by element
/* bugs:
*   can't detect texts that ain't rules
* */

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

        // console.log(ast.stylesheet.rules);

        ast.stylesheet.rules.some(rule => {
            if (rule.type !== "comment") {
                rule.selectors.forEach(selector => {
                    if (selector === element) {

                        const existing = rule.declarations.filter(
                            declaration => declaration.type !== "comment" && declaration.name === "box-shadow"
                        );

                        if (existing && existing.length) {
                            existing[0].value = color
                        }
                        else {
                            rule.declarations.push({
                                type: "property",
                                name: "box-shadow",
                                value: "red"
                            })
                        }
                    }
                })
            }
        });

        const css = mensch.stringify(ast, {
            comments: true,
            indentation: "\t"
        });

        const writeStream = fs.createWriteStream(`./${path}`);
        writeStream.write(css);
        writeStream.close();
        fileStream.close();

    });

    // shadowAction(fileStream, {
    //     path,
    //     color,
    //     element,
    //     rule: {
    //         directive: "box-shadow",
    //         value: `0 1px 8px ${color}`
    //     }
    // });
    //
    // console.log("Added shadow to " + path);

};