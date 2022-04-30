export default (rules) => {
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
}