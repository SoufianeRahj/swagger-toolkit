// take options object in input and return 1
// if the options are not valid
// or returns 0 if they are valid

const validateOptions = (options) => {
  // return an error if no options is passed
  if (!options) {
    console.error("no option is passed");
    return 1;
  }

  const keys = Object.keys(options);

  // for the moment possible to accept one options at a time
  if (keys.length > 1) {
    console.error("too many options are passed");
    return 1;
  }

  // at this time it is only possible to have one option
  const option = keys[0];
  if (option) {
    switch (option) {
      case "extract":
        return 0;
      case "model":
        return 0;
      default:
        console.error("no valid option was entered");
        return 1;
    }
  }
};

// these 2 lines are helper functions

// const options = { extract: "yes" };
// console.log(validateOptions(options));

module.exports = validateOptions;
