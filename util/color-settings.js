export default (color, size) => {

    let opacity
    if (size === "small")
        opacity = ".25"
    else
        opacity = "1"

    switch (color) {

        case "black": {
            return `rgba(0, 0, 0, ${opacity})`;
        }

        case "red": {
            return `rgba(255, 0, 0, ${opacity})`;
        }

        case "green": {
            return `rgba(0, 128, 0, ${opacity})`;
        }

        default: {

            if ("#" + color.match(/^#([0-9a-f]{3}){1,2}$/i))
                return hexToRgb(color, opacity)
            else
                throw "Invalid color...";


        }

    }

};

const hexToRgb = (hex, opacity) => {
    return 'rgba(' + (hex = hex.replace('#', ''))
        .match(new RegExp('(.{' + hex.length/3 + '})', 'g'))
        .map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) })
        .concat(isFinite(opacity) ? opacity : 1)
        .join(',') + ')';
};