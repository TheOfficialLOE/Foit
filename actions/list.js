import * as fs from "fs";
import mensch from "mensch";
import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import fuzzy from "fuzzy";

export default async (path) => {

    inquirer.registerPrompt("autocomplete", inquirerPrompt);

    if (!path.endsWith(".css"))
        path += ".css";

    const fileStream = fs.createReadStream(`./${path}`);

    fileStream.on("data", chunk => {

        const css = chunk.toString();

        const ast = mensch.parse(css, { comments: true });

        const selectors = ast.stylesheet.rules
            .map(rule => rule.selectors && rule.selectors.join(""))
            .filter(selector => selector !== undefined);

        inquirer
            .prompt([
                {
                    type: "autocomplete",
                    name: "selector",
                    message: 'Choose your selector',
                    source: (answers, input = "") => {
                        return new Promise((resolve, reject) => {
                            resolve(fuzzy.filter(input, selectors).map((el) => el.original));
                        });
                    }
                },
                {
                    type: "checkbox",
                    name: "action",
                    message: "Choose your action",
                    choices: [ "shadow", "border" ]
                }
            ])
            .then(answer => {
                console.log(answer)
            })
            .catch(err => {
                lodash(err);
            });

    });

};