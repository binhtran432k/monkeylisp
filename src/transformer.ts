import type { CallExpression, NumberLiteral, Program } from "./parser";
import { type Node, NodeType } from "./parser";

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
	expression: JsNode;
}

export type JsNode =
	| JsProgram
	| JsNumberLiteral
	| JsCallExpression
	| JsIdentifier
	| JsExpressionStatement;

const visitProgram = (node: Program): JsProgram => {
	return {
		type: JsNodeType.Program,
		body: node.body.map((n) => visit(n, node)),
	};
};

const visitNumberLiteral = (node: NumberLiteral): JsNumberLiteral => {
	return {
		type: JsNodeType.NumberLiteral,
		value: node.value,
	};
};

const visitCallExpression = (
	node: CallExpression,
	parent?: Node,
): JsCallExpression | JsExpressionStatement => {
	if (parent && parent.type !== NodeType.CallExpression) {
		return {
			type: JsNodeType.ExpressionStatement,
			expression: visitCallExpression(node),
		};
	}
	return {
		type: JsNodeType.CallExpression,
		callee: {
			type: JsNodeType.Identifier,
			name: (node as CallExpression).name,
		} as JsIdentifier,
		arguments: node.params.map((n) => visit(n, node)),
	};
};

const visit = (node: Node, parent?: Node): JsNode => {
	if (node.type === NodeType.Program) return visitProgram(node);
	if (node.type === NodeType.NumberLiteral) return visitNumberLiteral(node);
	if (node.type === NodeType.CallExpression)
		return visitCallExpression(node, parent);
	throw new TypeError(`Unknow node: ${node}`);
};

export default (ast: Program) => {
	return visit(ast);
};
