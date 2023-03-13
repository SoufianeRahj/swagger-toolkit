const regex = /"#\/definitions\/[A-z]*"/g;

const getModelFromPattern = (pattern) => {
  return pattern.substring(15, pattern.length - 1);
};

// return a string array of dependencies from
// a model object or null

const getChildDependencies = (modelObj) => {
  const model = JSON.stringify(modelObj);
  const results = model.match(regex);
  if (results) {
    const dependencies = results.map(getModelFromPattern);
    return dependencies;
  }
  return null;
};

const getAllDependencies = (collection, root) => {
  //contains the list of dependencies for the root model passed
  const dependenciesList = new Set();
  // the dependecies list contains the root node as well
  dependenciesList.add(root);

  // add a set for the nodes for which the dependencies were searched
  const searchedItems = new Set();

  // contains the nodes that will be traversed with a BFT algo
  let currentNodes = [];
  let newNodes = [];

  // first iteration
  const results = getChildDependencies(collection[root]);
  searchedItems.add(root);
  if (results) {
    results.forEach((el) => {
      dependenciesList.add(el);
      newNodes.push(el);
    });
  }

  currentNodes = newNodes;
  newNodes = []; // the ref remains only in current nodes

  while (dependenciesList.size !== searchedItems.size) {
    //search for the dependencies of the current nodes
    for (let node of currentNodes) {
      // only search for dependencies of unsearched items
      if (!searchedItems.has(node)) {
        const foundNodes = getChildDependencies(collection[node]);
        // add the searched node
        searchedItems.add(node);
        if (foundNodes) {
          foundNodes.forEach((el) => {
            dependenciesList.add(el);
            newNodes.push(el);
          });
        }
      }
    }
    currentNodes = newNodes;
    newNodes = [];
  }
  return dependenciesList;
};

module.exports = getAllDependencies;
