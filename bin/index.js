#!/usr/bin/env node

import { Command, Option, Argument } from "commander";
const program = new Command();

program.name("foit");

program
    .command("shadow")
    .argument("<path>", "Path to CSS file")
    .argument("<element>", "Target element")
    .addArgument(new Argument("<color>", "Shadow color").argOptional().default("black"))
    .addOption(new Option("-s, --size <type>", "Type of the shadow").choices(["little", "big"]).default("little"))
    .action(async (path, element, color, options) => {
        console.log(path, element,color, options);
    });


await program.parseAsync(process.argv);