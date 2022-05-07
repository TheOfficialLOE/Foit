#!/usr/bin/env node

import { Command, Option, Argument } from "commander";
import list from "../actions/foit.js";
const program = new Command();

program.name("foit");

program
    .argument("<path>", "Path to CSS file")
    .action(list)

await program.parseAsync(process.argv);