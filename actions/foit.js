import * as fs from "fs";
import mensch from "mensch";
import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import fuzzy from "fuzzy";
import {elements} from "../util/is-element.js";
import colorPref from "../util/color-settings.js";
import actionPerformer from "../util/action-performer.js";

export default async (path) => {

    inquirer.registerPrompt("autocomplete", inquirerPrompt);

    if (!path.endsWith(".css"))
        path += ".css";

    const fileStream = fs.createReadStream(`./${path}`);

    fileStream.on("error", error => {
        if (error.code === "ENOENT")
            console.log("Couldn't find the file:(");
    });

    fileStream.on("data", async chunk => {

        const css = chunk.toString();

        const ast = mensch.parse(css, { comments: true });

        let selectors = ast.stylesheet.rules
            .map(rule => rule.selectors && rule.selectors.join(""))
            .filter(selector => selector !== undefined);

        selectors = selectors.concat(elements);

        selectors = [...new Set(selectors)];

        const prompt = await inquirer
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
            ]);

        const selector = prompt.selector;
        let action = prompt.action;

        if (action.length === 0) {
            console.log("Please choose an action.")
            return;
        }

        if (action.length === 2) {
            console.log("Please choose only one action.")
            return;
        }

        action = action.toString();

        switch (action) {

            case "shadow": {

                const shadow = await inquirer.prompt([
                    {
                        name: "color",
                        message: "Choose shadow color (default black)",
                        default: "black"
                    },
                    {
                        type: "checkbox",
                        name: "size",
                        message: "Choose shadow size",
                        choices: [ "small", "large" ]
                    }
                ]);

                const size = shadow.size;

                if (size.length === 0) {
                    console.log("Please choose a size.")
                    return;
                }

                if (size.length === 2) {
                    console.log("Please choose only one size.")
                    return;
                }

                const color = "0 2px 8px " + colorPref(shadow.color, size.toString());

                actionPerformer(fileStream, {
                    path,
                    selector,
                    ast,
                    action: "box-shadow",
                    value: color,
                })

                console.log("success!");

                break;
            }

            case "border": {


                const border = await inquirer.prompt([
                    {
                        type: "checkbox",
                        name: "position",
                        message: "Choose border position",
                        choices: [ "full", "top", "right", "bottom", "left" ]
                    },{
                        name: "width",
                        message: "Choose border width (default 12px)",
                        default: "12px"
                    },{
                        name: "style",
                        message: "Choose border style (default solid)",
                        default: "solid"
                    },{
                        name: "color",
                        message: "Choose border color (default black)",
                        default: "black"
                    }
                ]);

                let position = border.position;
                const width = border.width.endsWith("px") ? border.width : border.width + "px";
                const style = border.style;
                const color = colorPref(border.color, "large");

                if (position.length === 0) {
                    console.log("Please choose an action.")
                    return;
                }

                if (position.length !== 1) {
                    console.log("Please choose only one position.")
                    return;
                }

                position = position.toString() === "full" ? "border" : `border-${position}`;

                actionPerformer(fileStream, {
                    path,
                    selector,
                    ast,
                    action: position,
                    value: width + " " + style + " " + color
                });

                console.log("success!");

                break;
            }


        }

    });


};