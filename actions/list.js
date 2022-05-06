import * as fs from "fs";
import mensch from "mensch";
import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import fuzzy from "fuzzy";

export default async (path) => {

    if (!path.endsWith(".css"))
        path += ".css";

    const fileStream = fs.createReadStream(`./${path}`);

    fileStream.on("data", chunk => {

        const css = chunk.toString();

        const ast = mensch.parse(css, { comments: true });

        const selectors = ast.stylesheet.rules
            .map(rule => rule.selectors && rule.selectors.join(""))
            .filter(selector => selector !== undefined);

    });

};

// inquirer.registerPrompt("autocomplete", inquirerPrompt);

// const foods = ['Apple', 'Orange', 'Banana', 'Kiwi', 'Lichi', 'Grapefruit'];

// function searchFood(answers, input = '') {
//     return new Promise((resolve) => {
//         resolve(fuzzy.filter(input, foods).map((el) => el.original));
//     });
// }
//
// inquirer
//     .prompt([{
//         type: "autocomplete",
//         name: "from",
//         message: 'Select a state to travel from',
//         source: searchFood
//     }])
//     .then(answers => {
//         console.log(answers);
//     })
//     .catch(err => {
//         console.log(err);
//     });