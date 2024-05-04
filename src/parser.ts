import { type Token, TokenType } from "./tokenizer";

export enum NodeType {
	Program = 0,
	NumberLiteral = 1,
	CallExpression = 2,
}

export interface Program {
	type: NodeType.Program;
	body: Node[];
}

export interface NumberLiteral {
	type: NodeType.NumberLiteral;
	value: number;
}

export interface CallExpression {
	type: NodeType.CallExpression;
	name: string;
	params: Node[];
}

export type Node = Program | NumberLiteral | CallExpression;

export default (tokens: Token[]) => {
	let current = 0;
	const walk = (): Node => {
		let token = tokens[current];
		if (token.type === TokenType.Number) {
			current++;
			return {
				type: NodeType.NumberLiteral,
				value: Number(token.value),
			} as NumberLiteral;
		}
		if (token.type === TokenType.Paren && token.value === "(") {
			token = tokens[++current];
			const expression: CallExpression = {
				type: NodeType.CallExpression,
				name: token.value,
				params: [],
			};
			token = tokens[++current];
			while (token.type !== TokenType.Paren || token.value !== ")") {
				expression.params.push(walk());
				token = tokens[current];
			}
			current++;
			return expression;
		}
		throw new TypeError(`Unknown token: '${token}'`);
	};
	const ast: Program = {
		type: NodeType.Program,
		body: [],
	};
	while (current < tokens.length) {
		ast.body.push(walk());
	}
	return ast;
};
