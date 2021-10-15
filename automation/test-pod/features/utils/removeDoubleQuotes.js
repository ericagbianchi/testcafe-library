/**
 * Function with a replace Regex to remove double quotes from the string.
 * "I am here"  => I am here (replaced)
 * I "am" here  => I "am" here (untouched)
 * I am here"   => I am here" (untouched)
 */

// Check if the element is a string
function isString(o) {
  return (
    typeof o === "string" || (typeof o === "object" && o.constructor === String)
  );
}

function removeDoubleQuotesForNumber(string) {
  if (isString(string) != "string") {
    string = String(string);
    string.replace(/^"(.*)"$/, "");
    return Number(string);
  } else return string.replace(/^"(.*)"$/, "");
}

function removeDoubleQuotes(string) {
  return string.replace(/^"(.*)"$/, "$1");
}

module.exports = {
  removeDoubleQuotesForNumber,
  removeDoubleQuotes,
};
