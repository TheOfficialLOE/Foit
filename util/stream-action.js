import parseCss from "../lib/parse-css.js";
import stringify from "../lib/stringify.js";
import * as fs from "fs";

export default (fileStream, data) => {

    fileStream.on("data", chunk => {

        const tree = parseCss(chunk.toString());
        let nonFound = true;

        tree.forEach(selection => {

            if (selection.selector === data.element) {

                selection.rules = selection.rules.filter(rule => {
                    return rule.directive !== data.rule.directive;
                });

                selection.rules.push({
                    directive: data.rule.directive,
                    value: data.rule.value
                });
                nonFound = false;
            }

        });

        let updated = stringify(tree);

        if (nonFound)
            updated += `${data.element} ` + "{\n" + `\t${data.rule.directive}: ${data.rule.value}\n}`;

        const writeStream = fs.createWriteStream(`./${data.path}`);
        writeStream.write(updated);
        writeStream.close();
        fileStream.close();

    });


};