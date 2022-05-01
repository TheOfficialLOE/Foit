import * as fs from "fs";
import isElement from "../util/is-element.js";
import colorPref from "../util/color-settings.js";
import shadowAction from "../util/css-action.js";


// todo: search by element
/* bugs:
*   can't detect texts that ain't rules
* */

export default async (path, element, color, options) => {

    if (!path.endsWith(".css"))
        path += ".css";

    if (!element.startsWith(".") && !isElement(element))
        element = "." + element;

    color = colorPref(color, options.size);

    const fileStream = fs.createReadStream(`./${path}`);

    shadowAction(fileStream, {
        path,
        color,
        element,
        rule: {
            directive: "box-shadow",
            value: `0 1px 8px ${color}`
        }
    });

    console.log("Added shadow to " + path);

};