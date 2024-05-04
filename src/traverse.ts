import { type Node, NodeType, type Program } from "./parser";

export default (
	ast: Program,
	visitors: Record<number, (node: Node, parent?: Node) => void>,
) => {
	const walkNode = (node: Node, parent?: Node) => {
		const visit = visitors[node.type];
		if (visit) {
			visit(node, parent);
		}
		if (node.type === NodeType.Program) {
			walkNodes(node.body, node);
		} else if (node.type === NodeType.CallExpression) {
			walkNodes(node.params, node);
		}
	};
	const walkNodes = (nodes: Node[], parent?: Node) => {
		for (const node of nodes) {
			walkNode(node, parent);
		}
	};
	walkNode(ast);
};
