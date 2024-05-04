import compiler from "./compiler";

const input = "(add 2 3 (sub 20 15 3) 10 (sub 4 3)) (add 1 2)";
const output = compiler(input);
console.log(output);
