const fs = require("fs");

const getAllDependencies = require("./match.js");

// read the input swagger
const swaggerObj = fs.readFileSync("./../swagger-input.json");
const swagger = JSON.parse(swaggerObj);

// extract the models from the swagger
const { definitions } = swagger;

// export the model in a separated file
const exportModel = (root) => {
  const dependencies = getAllDependencies(definitions, root);
  const exportedModel = {};
  for (let model of dependencies) {
    exportedModel[model] = JSON.parse(JSON.stringify(definitions[model]));
  }
  const jsonModel = JSON.stringify(exportedModel);
  fs.writeFileSync(`./../${root}.json`, jsonModel, {
    encoding: "utf8",
    flag: "w",
  });
};

const main = () => {
  const root = process.argv[2];
  if (!root) {
    console.log("please enter an argument");
    return 1;
  }
  if (!definitions[root]) {
    console.log("the element entered is not part of the swagger");
    return 1;
  }
  exportModel(root);
  return 0;
};

main();
