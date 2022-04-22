#!/usr/bin/env node

import { Command, Option, Argument } from "commander";
import shadow from "../actions/shadow.js";
const program = new Command();

program.name("foit");

program
    .command("shadow")
    .argument("<path>", "Path to CSS file")
    .argument("<element>", "Target element")
    .addArgument(new Argument("<color>", "Shadow color").argOptional().default("black"))
    .addOption(new Option("-s, --size <type>", "Type of the shadow").choices(["little", "big"]).default("little"))
    .action(shadow);


await program.parseAsync(process.argv);