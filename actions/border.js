import * as fs from "fs";
import colorPref from "../util/color-settings.js";
import isElement from "../util/is-element.js";
import actionPerformer from "../util/action-performer.js";

export default async (path, element, options) => {

    /* options
    * position todo: remove any detected border if position is `full`
    * width
    * style todo: only valid border styles are allowed
    * color
    * */

    if (!path.endsWith(".css"))
        path += ".css";

    if (!element.startsWith(".") && !isElement(element))
        element = "." + element;

    let position = options.position === "full" ? "border" : `border-${options.position}`;
    let width = options.width.endsWith("px") ? options.width : options.width + "px";
    let style = options.style;
    let color = colorPref(options.color, "large");

    const fileStream = fs.createReadStream(`./${path}`);

    actionPerformer(fileStream, {
        path,
        action: position,
        element: element,
        value: width + " " + style + " " + color,
    });

};