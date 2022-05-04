import fs from "fs";
import mensch from "mensch";
import chalk from "chalk";

const actionPerformer = (fileStream, data) => {

    fileStream.on("error", error => {
       if (error.code === "ENOENT")
           console.log(chalk.red("Couldn't find the file:("))
    });

    fileStream.on("data", chunk => {

        const ast = mensch.parse(chunk.toString(), {
            comments: true
        });

        let foundSelector = false;

        ast.stylesheet.rules.some(rule => {
            if (rule.type === "rule") {
                if (rule.selectors.includes(data.element)) {
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
                selectors: [data.element],
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

        console.log(chalk.green("Successful!"));

    });


};

export default actionPerformer;