// parse CLI arguments and build options object
// or return null if invalid input

const parseArguments = () => {
  if (process.argv.length <= 2) {
    console.error("No arguments passed to the programm");
    return null;
  }
  // remove first two elements of process.argv
  const arguments = process.argv.slice(2);

  //validate arguments
  if (!validateArguments(arguments)) {
    return null;
  }

  // parse the passed arguments into the options object
  const options = {};
  let param, value;
  for (let i = 0; i < arguments.length; i++) {
    if (i % 2 === 0) {
      param = arguments[i].slice(2);
    }
    if (i % 2 === 1) {
      value = arguments[i];
      options[param] = value;
    }
  }
  return options;
};

const validateArguments = (arguments) => {
  // the number of arguments passed must be even
  if (arguments.length % 2 !== 0) {
    console.error("Invalid number of arguments passed");
    return null;
  }

  for (let i = 0; i < arguments.length; i++) {
    // validate parameter
    if (i % 2 === 0) {
      if (!validateParameter(arguments[i])) {
        return null;
      }
    }
  }
  return 1;
};

const validateParameter = (param) => {
  if (param.length < 2) {
    console.error("invalid parameter entered");
    return null;
  }
  const paramBegin = param.slice(0, 2);
  if (paramBegin !== "--") {
    console.error("invalid parameter entered");
    return null;
  }
  return 1;
};

const result = parseArguments();
console.log(result);

// module.exports = parseArguments;
