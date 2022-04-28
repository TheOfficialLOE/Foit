import * as fs from "fs";
import parseCss from "../lib/parse-css.js";
import isElement from "../util/is-element.js";
import colorPref from "../util/color-settings.js";

export default async (path, element, color, options) => {

    if (!element.startsWith(".") && !isElement(element))
        element = "." + element;

    color = colorPref(color, options.size);

    const fileStream = fs.createReadStream(`./${path}.css`);

    fileStream.on("data", chunk => {

        const tree = parseCss(chunk.toString());
        let updated = "";

        tree.forEach(selection => {

            let rules = "";

            if (selection.selector === element) {
                selection.rules.push({
                   directive: "box-shadow",
                   value:  `0 1px 8px ${color}`
                });
            }

            selection.rules.forEach(rule => {
                rules += "\t" + rule.directive + ": " + rule.value + ";\n"
            });

            updated += selection.selector + " {\n" + rules + "}\n\n"


        });

        const writeStream = fs.createWriteStream(`./${path}.css`);
        writeStream.write(updated);

    });

};