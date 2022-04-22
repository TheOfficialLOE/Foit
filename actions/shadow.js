import { promises as fs } from "fs";

export default async (path, element, color, options) => {

    const file = await fs.open(`./${path}.css`, "r+");

    const data = (await file.readFile()).toString();

    const starting = data.search(element);
    const ending = data.indexOf("}", starting);

    await file.write(`\tbackground-color:${color}\r\n}`, ending);

    await file.close();

    console.log(path, element,color, options);
};