import * as fs from "fs";
import inputConfig from "../util/input-config.js"
import actionPerformer from "../util/action-performer.js";

export default async (path, element, color, options) => {

    const modified = inputConfig(path, element, color, options.size);

    const fileStream = fs.createReadStream(`./${modified.path}`);

    actionPerformer(fileStream, {
        action: "box-shadow",
        element: modified.element,
        value: "0 2px 8px " + modified.color,
        path: modified.path
    });

    console.log("Added shadow to " + element);

};