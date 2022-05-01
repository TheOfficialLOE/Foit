
const regexes = {
    cssRegex: new RegExp('([\\s\\S]*?){([\\s\\S]*?)}', 'gi'),
    cssMediaQueryRegex: '((@media [\\s\\S]*?){([\\s\\S]*?}\\s*?)})',
    cssKeyframeRegex: '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})',
    combinedCSSRegex: '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})',
    cssCommentsRegex: '(\\/\\*[\\s\\S]*?\\*\\/)',
    cssImportStatementRegex: new RegExp('@import .*?;', 'gi')
};

export const parseCss = (source) => {

    if (source === undefined) {
        return [];
    }

    const css = [];

    const cssImportStatements = [];

    const imports = regexes.cssImportStatementRegex.exec(source);
    if (imports !== null) {

        for (let i = 0; i < imports.length; i++) {
            cssImportStatements.push(imports[0]);
            css.push({
                selector: '@import',
                type: 'import',
                styles: imports[0]
            });
        }

    }
    source = source.replace(regexes.cssImportStatementRegex, '');

    const keyframesRegex = new RegExp(regexes.cssKeyframeRegex, 'gi');
    const keyFrames = keyframesRegex.exec(source);
    if (keyFrames !== null) {

        for (let i = 0; i < keyFrames.length; i++) {
            css.push({
                selector: '@keyframes',
                type: 'keyframes',
                styles: keyFrames[0]
            });
        }

    }
    source = source.replace(keyframesRegex, '');


    const unified = new RegExp(regexes.combinedCSSRegex, 'gi');

    let parsed;

    while (true) {
        parsed = unified.exec(source);
        if (parsed === null) {
            break;
        }
        let selector = '';
        if (parsed[2] === undefined) {
            selector = parsed[5].split('\r\n').join('\n').trim();
        } else {
            selector = parsed[2].split('\r\n').join('\n').trim();
        }

        // const commentsRegex = new RegExp(regexes.cssCommentsRegex, 'gi');
        // const comments = commentsRegex.exec(selector);
        // if (comments !== null) {
        //     selector = selector.replace(commentsRegex, '').trim();
        // }

        selector = selector.replace(/\n+/, "\n");

        if (selector.indexOf('@media') !== -1) {
            const cssObject = {
                selector: selector,
                type: 'media',
                subStyles: parseCss(parsed[3] + '\n}')
            };
            // if (comments !== null) {
            //     cssObject.comments = comments[0];
            // }
            css.push(cssObject);
        } else {

            const rules = parseRules(parsed[6]);
            const style = {
                selector: selector,
                rules: rules
            };

            if (selector.startsWith("/*")) {
                style.type = "comment"
            }

            if (selector === '@font-face') {
                style.type = 'font-face';
            }
            // if (comments !== null) {
            //     style.comments = comments[0];
            // }
            css.push(style);
        }
    }

    return css;
}

export const parseRules = (rules) => {
    rules = rules.split('\r\n').join('\n');
    const ret = [];

    rules = rules.split('\n');

    for (let i = 0; i < rules.length; i++) {
        let line = rules[i];

        line = line.trim();
        if (line.indexOf(':') !== -1) {
            line = line.split(':');
            const cssDirective = line[0].trim();
            const cssValue = line.slice(1).join(':').trim().replace(";", "");

            if (cssDirective.length < 1 || cssValue.length < 1) {
                continue;
            }

            if (cssDirective.startsWith("/*")) {
                ret.push({
                    type: "comment",
                    directive: cssDirective.replace("/*", ""),
                    value: cssValue
                });
            }
            else {
                ret.push({
                    directive: cssDirective,
                    value: cssValue
                });
            }
        }
        else {

            if (line.trim().substr(0, 7) === 'base64,') {
                ret[ret.length - 1].value += line.trim();
            } else {

                if (line.length > 0) {
                    ret.push({
                        directive: '',
                        value: line,
                        defective: true
                    });
                }
            }
        }
    }

    return ret;
};

export const stringify = (tree) => {

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