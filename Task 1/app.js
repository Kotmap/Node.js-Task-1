const stream = require("stream");
const fs = require("fs")
const util = require("util")
const program = require("commander")

const Validator = require("./functions/validator.class");
const FooTransform = require("./functions/function.class");

const pipeline = util.promisify(stream.pipeline)
const { log, info } = console;
const errorMessage = ("✘ Erorr");
const successMessage = ("✔ Successful");
const codeMessage = ("Code");

const actionHandler = async () => { 
    let {input, output, action} = program.opts();

    Validator.isEmpty(input) && info(('Input text [press enter to run | press ctrl + c to exit]:'));
    try {
        await pipeline(
            !Validator.isEmpty(input) ? fs.createReadStream(input) : process.stdin,
            new FooTransform(action),
            !Validator.isEmpty(output) ? fs.createWriteStream(output, {flags: 'a'}) : process.stdout
        )
        log(`${successMessage} text ${action}`)
    } catch (e) {
        process.stderr.write(`${errorMessage} ${e.message}\n`);
        process.exit(1);
    }
};

process.stdin.setEncoding("utf8");
process.on("exit", (code) => log(`${codeMessage} ${code}`));
process.on("SIGINT", () => {
  process.exit(0);
});

program
  .requiredOption("-a --action <action>", "An action 1st/2nd function")
  .option("-i, --input <filename>", "An input file")
  .option("-o --output <filename>", "An output file")
  .action(actionHandler);

program.parse(process.argv);