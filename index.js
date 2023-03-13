const fs = require("fs");

const { getAllDependencies } = require("./match.js");
const validateOptions = require("./utils.js");
const parseArguments = require("./parseArguments.js");
const buildSwagger = require("./swaggerBuilder.js");

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
  const options = parseArguments();
  if (validateOptions(options)) {
    console.error("nothing to do exiting the process");
    return 1;
  }
  const option = Object.keys(options)[0];
  switch (option) {
    case "extract":
      buildSwagger(swaggerObj);

    case "model":
      const model = options.model;
      if (!definitions[model]) {
        console.log("the element entered is not part of the swagger");
        return 1;
      }
      exportModel(model);
  }
  return 0;
};

main();
