export enum TokenType {
	Paren = 0,
	Name = 1,
	Number = 2,
}

export interface Token {
	type: TokenType;
	value: string;
}

const LETTERS = /[a-z]/i;
const NUMBERS = /\d/;
const WHITESPACE = /\s/;

export default (input: string) => {
	const tokens: Token[] = [];
	let current = 0;

	while (current < input.length) {
		let char = input[current];
		if (char === "(" || char === ")") {
			tokens.push({ type: TokenType.Paren, value: char });
			current++;
			continue;
		}
		if (LETTERS.test(char)) {
			let i = 0;
			while (LETTERS.test(char)) {
				char = input[current + ++i];
			}
			tokens.push({
				type: TokenType.Name,
				value: input.slice(current, current + i),
			});
			current += i;
			continue;
		}
		if (NUMBERS.test(char)) {
			let i = 0;
			while (NUMBERS.test(char)) {
				char = input[current + ++i];
			}
			tokens.push({
				type: TokenType.Number,
				value: input.slice(current, current + i),
			});
			current += i;
			continue;
		}
		if (WHITESPACE.test(char)) {
			current++;
			continue;
		}
		throw new TypeError(`Unknown char: '${char}'`);
	}
	return tokens;
};
