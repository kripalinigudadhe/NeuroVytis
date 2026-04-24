const fs = require("fs");

// Load model
const trees = JSON.parse(fs.readFileSync("model.json", "utf-8"));

// Predict single tree
function predictTree(node, row) {
  if (row[node.index] < node.value) {
    return typeof node.left === "object"
      ? predictTree(node.left, row)
      : node.left;
  } else {
    return typeof node.right === "object"
      ? predictTree(node.right, row)
      : node.right;
  }
}

// Predict forest
function predict(input) {
  const predictions = trees.map(tree => predictTree(tree, input));

  // count votes
  const count = {};
  predictions.forEach(p => {
    count[p] = (count[p] || 0) + 1;
  });

  // majority vote
  const result = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );

  // probability
  const probability = (count[result] / trees.length) * 100;

  return {
    prediction: Number(result),
    probability: probability.toFixed(2)
  };
}

module.exports = { predict };