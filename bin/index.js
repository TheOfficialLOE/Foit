#!/usr/bin/env node

import { Command, Option, Argument } from "commander";
import shadow from "../actions/shadow.js";
import border from "../actions/border.js";
const program = new Command();

program.name("foit");

program
    .command("shadow")
    .argument("<path>", "Path to CSS file")
    .argument("<element>", "Target element")
    .addArgument(new Argument("<color>", "Shadow color").argOptional().default("black"))
    .addOption(new Option("-s, --size <type>", "Type of the shadow").choices(["small", "large"]).default("small"))
    .action(shadow);

program
    .command("border")
    .argument("<path>", "Path to CSS file")
    .argument("<element>", "Target element")
    .addOption(
        new Option("-p, --position, <position>", "Border position")
            .choices(["full", "top", "right", "bottom", "left"])
            .default("full"))
    .addOption(new Option("-w, --width, <width>").default("12px"))
    .addOption(new Option("-s, --style, <style>").default("solid"))
    .addOption(new Option("-c, --color, <color>").default("black"))
    .action(border);


await program.parseAsync(process.argv);