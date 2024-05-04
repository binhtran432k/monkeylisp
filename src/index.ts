import compiler from "./compiler";

const input = "(add (sub 4 3))";
const output = compiler(input);
console.log(output);
