// CLI argument parser
import yargs from "yargs";
// Helper to process argv
import { hideBin } from "yargs/helpers";
// Terminal string styling (colors)
import chalk from "chalk";

// Import password generation function from library
import { generatePassword } from "./lib/generator.js";

const VERSION = "1.0.0";

// Configure CLI options and parse arguments
const argv = yargs(hideBin(process.argv))
  // Set script name for help text
  .scriptName("passgen")
  // Define usage message
  .usage("$0 [options]")
  // Password length option
  .option("length", {
    alias: "l",
    type: "number",
    default: 16,
    describe: "Password length",
  })
  // Version option
  .option("version", {
    type: "boolean",
    describe: "Show version and exit",
  })
  // Enable help command
  .help()
  // Parse the arguments
  .parse()

// Handle version flag
if (argv.version) {
    console.log(`passgen-cli-node ${VERSION}`);
    process.exit(0);
}

// Validate password length
if (!Number.isInteger(argv.length) || argv.length <= 0) {
    console.log(chalk.red(`Error: --length must be a positive integer. Got: ${argv.length}`));
    process.exit(1);
}

console.log(chalk.green("OK: CLI parsed successfully"));
console.log(`length = ${argv.length}`);