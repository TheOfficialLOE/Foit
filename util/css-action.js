// import parseCss from "../lib/parse-css.js";
// import stringify from "../lib/stringify.js";
import { parseCss, stringify } from "../lib/index.js";
import * as fs from "fs";

export default (fileStream, data) => {

    fileStream.on("data", chunk => {

        const tree = parseCss(chunk.toString());
        let nonFound = true;

        tree.forEach(selection => {

            if (selection.selector.includes(data.element) && Array.isArray(selection.rules)) {

                selection.rules = selection.rules.filter(rule => {
                    return rule.directive !== data.rule.directive || rule.type === "comment";
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

        // console.log(updated);

        const writeStream = fs.createWriteStream(`./${data.path}`);
        writeStream.write(updated);
        writeStream.close();
        fileStream.close();

    });


};