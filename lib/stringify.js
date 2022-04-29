export default (tree) => {

    let css = "";

    tree.forEach(selection => {

        let rules = "";

        selection.rules.forEach(rule => {
            rules += "\t" + rule.directive + ": " + rule.value + ";\n"
        });

        css += selection.selector + " {\n" + rules + "}\n\n";

    });

    return css;

};