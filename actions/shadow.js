import { promises as fs } from "fs";
import _ from "lodash";
import isElement from "../util/is-element.js";
import colorPref from "../util/color-settings.js";

export default async (path, element, color, options) => {
    const file = await fs.open(`./${path}.css`, "r+");

    const data = (await file.readFile()).toString();

    color = colorPref(color, options.size);

    // if the element isn't already specified
    // todo: make sure that it isn't defined as a comment
    if (data.search(element) === -1) {

        if (!isElement(element))
            element = "." + element;

        await file.appendFile(`${element} {\r\n\tbox-shadow: 0 1px 8px ${color};\r\n}`)

        console.log("Shadow added to " + element)

    }
    // if the element is already defined
    else {

        /* three cases are possible
        * some styles applied and each have ; at the end
        * some styles applied but the last one doesn't have a ;
        * an empty block
        * */

        const starting = data.search(element);
        let ending = data.indexOf("}", starting);

        for (const index of _.range(ending, starting - 1)) {
            if (data[index] === ";") {
                ending = index;
                break;
            }
        }

        await file.write(`\r\n\tbox-shadow: 0 1px 8px ${color};\r\n}`, ending + 1);

        console.log("Shadow added to " + element)

    }

    await file.close();

};