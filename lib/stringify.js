export default (tree) => {

    let css = "";

    tree.forEach(selection => {

        let rules = "";

        if (selection.type === "comment") {

            selection.rules.forEach(rule => {
                rules += "\t/*" + rule.directive + ": " + rule.value + ";*/\n"
            });

            css += selection.selector + " {*/\n" + rules + "/*}*/\n\n";

        }

        else {
            selection.rules.forEach(rule => {
                if (rule.type === "comment")
                    rules += "\t/*" + rule.directive + ": " + rule.value + "\n"
                else
                    rules += "\t" + rule.directive + ": " + rule.value + ";\n"
            });

            css += selection.selector + " {\n" + rules + "}\n\n";
        }


    });

    return css;

};