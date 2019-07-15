import cytoscape from 'cytoscape';
import klay from 'cytoscape-klay';

let klayRegistered = false;

const visit = (node, map, nodes, edges) => {
  if (!map[node.uuid]) {
    const left = node.mother;
    const right = node.father;

    map[node.uuid] = true;

    // save the node
    nodes.push({ data: { id: node.uuid } });

    if (left !== null) {
      edges.push({
        data: {
          id: `${node.uuid}->${left.uuid}`,
          source: node.uuid,
          target: left.uuid
        }
      });
    }

    if (right !== null) {
      edges.push({
        data: {
          id: `${node.uuid}->${right.uuid}`,
          source: node.uuid,
          target: right.uuid
        }
      });
    }
  }
}

const compareNodes = (a, b) =>  {
  return b.generation - a.generation;
}

const flatten = (root) => {
  const stack = [];
  const nodes = [];
  const edges = [];
  const map = {};

  stack.push(root);

  while (stack.length !== 0) {
    const node = stack.pop();
    const left = node.mother;
    const right = node.father;

    visit(node, map, nodes, edges);

    // push right first to visit it later
    if (right !== null) {
      stack.push(right);
    }

    // push left last to visit it next
    if (left !== null) {
      stack.push(left);
    }
  }

  return [nodes.sort(compareNodes), edges];
}


export const drawGraph = async (container, fittest) => {
  if (!klayRegistered) {
    klayRegistered = true;
    cytoscape.use(klay);
  }

  const [nodes, edges] = flatten(fittest);

  const cy = cytoscape({
    container: container,

    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#dd4de2'
        }
      },

      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'line-color': '#dd4de2',
          'target-arrow-color': '#dd4de2',
          'opacity': 0.5
        }
      }
    ]
  });

  cy.elements().remove();
  cy.add({nodes: nodes, edges: edges});
  cy.layout({name: 'klay', klay: {fixedAlignment: 'BALANCED', direction: 'DOWN', layoutHierarchy: true, nodePlacement: 'LINEAR_SEGMENTS'}}).run(); 
}