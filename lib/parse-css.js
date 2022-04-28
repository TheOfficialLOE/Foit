import {
    combinedCSSRegex,
    cssCommentsRegex,
    cssImportStatementRegex,
    cssKeyframeRegex
}
    from "./regexes.js";

import parseRules from "./parse-rules.js";

const parseCss =  (source) => {

    if (source === undefined) {
        return [];
    }

    const css = [];

    const cssImportStatements = [];

    const imports = cssImportStatementRegex.exec(source);
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
    source = source.replace(cssImportStatementRegex, '');

    const keyframesRegex = new RegExp(cssKeyframeRegex, 'gi');
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


    const unified = new RegExp(combinedCSSRegex, 'gi');

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

        const commentsRegex = new RegExp(cssCommentsRegex, 'gi');
        const comments = commentsRegex.exec(selector);
        if (comments !== null) {
            selector = selector.replace(commentsRegex, '').trim();
        }

        selector = selector.replace(/\n+/, "\n");

        if (selector.indexOf('@media') !== -1) {
            const cssObject = {
                selector: selector,
                type: 'media',
                subStyles: parseCss(parsed[3] + '\n}')
            };
            if (comments !== null) {
                cssObject.comments = comments[0];
            }
            css.push(cssObject);
        } else {

            const rules = parseRules(parsed[6]);
            const style = {
                selector: selector,
                rules: rules
            };
            if (selector === '@font-face') {
                style.type = 'font-face';
            }
            if (comments !== null) {
                style.comments = comments[0];
            }
            css.push(style);
        }
    }

    return css;
};

export default parseCss;