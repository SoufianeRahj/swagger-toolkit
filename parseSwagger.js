// build a {paths: {}} object from the swagger
// based on which path should be extracted
// the input swagger is a string here

const extractPaths = (swaggerStr) => {
  // output object with the paths to be extracted

  //extract all the paths
  let swagger = JSON.parse(swaggerStr);
  let { paths } = swagger;

  // iterate over paths to see which endpoint should be extracted
  const pathList = Object.keys(paths);
  let outputPaths = {};
  for (let path of pathList) {
    if (isPathToExtract(paths[path])) {
      //copy the path to the outputPaths object
      outputPaths[path] = filterPath(paths[path]);
    }
  }
  const output = { paths: outputPaths };
  return output;
};

// takes a path object in input and outputs a
// path object with the endpoints to be extracted
const filterPath = (path) => {
  let newPath = {};
  const endpoints = Object.keys(path);
  for (let endpoint of endpoints) {
    if (isEndpointToExtract(path[endpoint])) {
      newPath[endpoint] = path[endpoint];
      // clean the extract keyword from the endpoint object
      delete newPath[endpoint]["extract"];
    }
  }
  return newPath;
};

// takes an endpoint objet and return true if
// set to extract and false otherwise
const isEndpointToExtract = (endpoint) => {
  if (endpoint["extract"] && endpoint["extract"] === "yes") {
    return true;
  }
  return false;
};

// takes a path object in input
// returns true if to be extracted
// false otherwise
const isPathToExtract = (path) => {
  let endpoints = Object.keys(path);
  for (let endpoint of endpoints) {
    if (isEndpointToExtract(path[endpoint])) {
      return true;
    }
  }
  return false;
};

// for testing purposes

// const paths = extractPaths(swagger);
// console.log("the paths to extract are: ", paths);

module.exports = extractPaths;
