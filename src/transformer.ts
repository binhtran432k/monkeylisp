import type { CallExpression, NumberLiteral, Program } from "./parser";
import { NodeType } from "./parser";
import traverse from "./traverse";

export enum JsNodeType {
	Program = 0,
	NumberLiteral = 1,
	CallExpression = 2,
	Identifier = 3,
	ExpressionStatement = 4,
}

export interface JsProgram {
	type: JsNodeType.Program;
	body: JsNode[];
}

export interface JsNumberLiteral {
	type: JsNodeType.NumberLiteral;
	value: number;
}

export interface JsCallExpression {
	type: JsNodeType.CallExpression;
	callee: JsNode;
	arguments: JsNode[];
}

export interface JsIdentifier {
	type: JsNodeType.Identifier;
	name: string;
}

export interface JsExpressionStatement {
	type: JsNodeType.ExpressionStatement;
	expression: JsCallExpression;
}

export type JsNode =
	| JsProgram
	| JsNumberLiteral
	| JsCallExpression
	| JsIdentifier
	| JsExpressionStatement;

export default (ast: Program) => {
	const jsAst: JsProgram = {
		type: JsNodeType.Program,
		body: [],
	};

	let position = jsAst.body;

	traverse(ast, {
		[NodeType.NumberLiteral]: (node) => {
			position.push({
				type: JsNodeType.NumberLiteral,
				value: (node as NumberLiteral).value,
			} as JsNumberLiteral);
		},
		[NodeType.CallExpression]: (node, parent) => {
			let expression: JsCallExpression | JsExpressionStatement = {
				type: JsNodeType.CallExpression,
				callee: {
					type: JsNodeType.Identifier,
					name: (node as CallExpression).name,
				} as JsIdentifier,
				arguments: [],
			};
			const prevPosition = position;
			position = expression.arguments;
			if (parent?.type !== NodeType.CallExpression) {
				expression = {
					type: JsNodeType.ExpressionStatement,
					expression,
				};
			}
			prevPosition.push(expression);
		},
	});

	return jsAst;
};
