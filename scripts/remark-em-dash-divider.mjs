// Treat standalone runs of em dashes as thematic breaks, without touching prose or code.
export default function remarkEmDashDivider() {
  return function transform(tree) {
    function visit(node) {
      if (!node.children) return;

      node.children = node.children.map((child) => {
        if (
          child.type === 'paragraph' &&
          child.children.length === 1 &&
          child.children[0].type === 'text' &&
          /^—(?:[ \t]*—){2,}$/.test(child.children[0].value.trim())
        ) {
          return { type: 'thematicBreak', position: child.position };
        }

        visit(child);
        return child;
      });
    }

    visit(tree);
  };
}
