export default (rules) => {
    rules = rules.split('\r\n').join('\n');
    const ret = [];

    rules = rules.split(';');

    for (let i = 0; i < rules.length; i++) {
        let line = rules[i];

        line = line.trim();
        if (line.indexOf(':') !== -1) {
            line = line.split(':');
            const cssDirective = line[0].trim();
            const cssValue = line.slice(1).join(':').trim();


            if (cssDirective.length < 1 || cssValue.length < 1) {
                continue;
            }

            ret.push({
                directive: cssDirective,
                value: cssValue
            });
        } else {

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