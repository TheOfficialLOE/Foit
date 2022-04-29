import * as fs from "fs";
import parseCss from "../lib/parse-css.js";
import stringify from "../lib/stringify.js";
import isElement from "../util/is-element.js";
import colorPref from "../util/color-settings.js";

export default async (path, element, color, options) => {

    if (!path.endsWith(".css"))
        path += ".css";

    if (!element.startsWith(".") && !isElement(element))
        element = "." + element;

    color = colorPref(color, options.size);

    const fileStream = fs.createReadStream(`./${path}`);

    fileStream.on("data", chunk => {

        const tree = parseCss(chunk.toString());
        let nonFound = true;

        tree.forEach(selection => {

            if (selection.selector === element) {

                selection.rules = selection.rules.filter(rule => {
                    return rule.directive !== "box-shadow";
                });

                selection.rules.push({
                    directive: "box-shadow",
                    value: `0 1px 8px ${color}`
                });
                nonFound = false;
            }

        });

        let updated = stringify(tree);

        if (nonFound)
            updated += `${element} ` + "{\n" + `\tbox-shadow: 0 1px 8px ${color}\n}\n`;

        const writeStream = fs.createWriteStream(`./${path}`);
        writeStream.write(updated);

        console.log("Added shadow to " + path);

    });

};