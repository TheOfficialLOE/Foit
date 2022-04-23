import { promises as fs } from "fs";
import isElement from "../util/is-element.js";
import colorPref from "../util/color-settings.js";

export default async (path, element, color, options) => {

    const file = await fs.open(`./${path}.css`, "r+");

    const data = (await file.readFile()).toString();

    // if the element isn't already specified
    // todo: make sure that it isn't defined as a comment
    if (data.search(element) === -1) {

        if (!isElement(element))
            element = "." + element;

        color = colorPref(color, options.size);

        await file.appendFile(`${element} {\r\n\tbox-shadow: 0 1px 8px ${color};\r\n}`)

        console.log("Shadow added to " + element)

    }
    // if the element is already defined
    else {

    }

    await file.close();

};