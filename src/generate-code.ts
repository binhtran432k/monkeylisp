import { type JsNode, JsNodeType } from "./transformer";

const generateCode = (node: JsNode): string | undefined => {
	if (node.type === JsNodeType.NumberLiteral) {
		return node.value.toString();
	}
	if (node.type === JsNodeType.Identifier) {
		return node.name;
	}
	if (node.type === JsNodeType.CallExpression) {
		// name(arg1, arg2, arg3)
		const callee = generateCode(node.callee);
		if (callee === "add") {
			return `(${node.arguments.map(generateCode).join(" + ")})`;
		}
		if (callee === "sub") {
			return `(${node.arguments.map(generateCode).join(" - ")})`;
		}
		return `${generateCode(node.callee)}(${node.arguments
			.map(generateCode)
			.join(", ")})`;
	}
	if (node.type === JsNodeType.ExpressionStatement) {
		return `${generateCode(node.expression)};`;
	}
	if (node.type === JsNodeType.Program) {
		return node.body.map(generateCode).join("\n");
	}
};

export default generateCode;
