import isElement from "./is-element.js";
import colorPref from "./color-settings.js";

export default (path, element, color, size) => {

    if (!path.endsWith(".css"))
        path += ".css";

    if (!element.startsWith(".") && !isElement(element))
        element = "." + element;

    color = colorPref(color, size);

    return { path, element, color };

};