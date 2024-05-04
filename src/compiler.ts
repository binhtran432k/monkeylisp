import parser from "./parser";
import tokenizer from "./tokenizer";
import transformer from "./transformer";

export default (input: string) => {
	// 1. Lexical Analysis -
	//      Breaks the input code (string) into the basic syntax
	//      of the language (array of objects)
	const tokens = tokenizer(input);
	// 2. Syntactic Analysis -
	//      Transforms the tokens (array of objects) into an
	//      AST (tree of objects) which represents our program
	const lispAst = parser(tokens);
	// 3. Transformation -
	//      Transforms our original Lisp AST into our target
	//      Javascript AST
	const jsAst = transformer(lispAst);
	// TODO:
	// 4. Code Generation
	return jsAst;
};
