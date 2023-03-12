// take options object in input and return 1
// if the options are not valid
// or returns 0 if they are valid

const validateOptions = (options) => {
  // return an error if no options is passed
  if (!options) {
    console.error("no option is passed");
    return 1;
  }

  console.log(options.keys);

  // for the moment possible to accept one options at a time
  if (options.keys().length > 1) {
    console.error("too many options are passed");
    return 1;
  }

  // at this time it is only possible to have one option
  const option = options.keys();
  switch (option[0]) {
    case "extract":
      return 0;
    case "model":
      return 0;
    default:
      return 1;
  }
};

const options = { test: "test", test2: "value" };
console.log(options.keys());

// validateOptions();

module.exports = validateOptions;
