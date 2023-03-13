const extractPaths = require("./parseSwagger.js");
const { getAllDependenciesOfSet, getChildDependencies } = require("./match.js");

// the following fs module import and usage is for testing purposes only
const fs = require("fs");

// takes a swagger str in input
// extract the paths with extract keywords
// get dependencies of this extracted swagger
// builds a swagger with the definitions part containing the depencies
const buildSwagger = (swaggerStr) => {
  // set the info, swagger, host, base path parts
  const swaggerObj = JSON.parse(swaggerStr);
  let swagger = {};
  swagger["swagger"] = swaggerObj["swagger"];
  swagger["info"] = swaggerObj["info"];
  swagger["host"] = swaggerObj["host"];
  swagger["basePath"] = swaggerObj["basePath"];

  // copy the paths
  swagger["paths"] = extractPaths(swaggerStr)["paths"];

  // this part focuses on building the definitions part of the swagger

  // get the direct dependencies of the extracted swagger
  const directDependencies = getChildDependencies(swagger);

  // get the definitions inside the swagger
  const { definitions } = JSON.parse(swaggerStr);

  // get all the depencies of the extracted swagger
  const dependencies = getAllDependenciesOfSet(definitions, directDependencies);

  let outputDefinitions = {};
  // build the definitions object
  for (let dependency of dependencies) {
    outputDefinitions[dependency] = definitions[dependency];
  }
  swagger["definitions"] = outputDefinitions;

  const swaggerOutput = JSON.stringify(swagger);

  fs.writeFileSync(`./../swagger.json`, swaggerOutput, {
    encoding: "utf8",
    flag: "w",
  });
};

module.exports = buildSwagger;
