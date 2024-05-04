import tokenizer from "./tokenizer";

export default (input: string) => {
	// 1. Lexical Analysis -
	//      Breaks the input code (string) into the basic syntax
	//      of the language (array of objects)
	const tokens = tokenizer(input);
	// TODO:
	// 2. Syntactic Analysis
	// 3. Transformation
	// 4. Code Generation
	const jsCode = tokens;
	return jsCode;
};
