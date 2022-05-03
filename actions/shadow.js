import * as fs from "fs";
import isElement from "../util/is-element.js";
import colorPref from "../util/color-settings.js";
import actionPerformer from "../util/action-performer.js";

export default async (path, element, color, options) => {

    if (!path.endsWith(".css"))
        path += ".css";

    if (!element.startsWith(".") && !isElement(element))
        element = "." + element;

    color = colorPref(color, options.size);

    const fileStream = fs.createReadStream(`./${path}`);

    actionPerformer(fileStream, {
        action: "box-shadow",
        element,
        value: color,
        path
    });

    console.log("Added shadow to " + element);

};