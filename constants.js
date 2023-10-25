const defaultActions = {
  allow: "allow",
  block: "block",
};

const useOperators = (a, b, operator) => {
  let result;
  switch (operator) {
    case "equals_to":
      result = a === b;
      break;
    case "not_equals_to":
      result = a !== b;
      break;
    case "greater_than":
      result = a >= b;
      break;
    case "greater":
      result = a > b;
      break;
    case "lesser":
      result = a < b;
      break;
    case "lesser":
      result = a <= b;
      break;

    default:
      result = undefined;
      break;
  }

  return result
};

//  const useCondition = (a, b, condition) => {
//   let result;

//   switch (condition) {
//     case "AND":
//       result = a && b;
//       break;
//     case "OR":
//       result = a || b;
//       break;

//     default:
//       result = undefined;
//       break;
//   }

//   return result;
// };

const conditions = {
  AND: "&&",
  OR: "||",
};
const eventSchema = {};

const nodeTypes = {
  rule: "rule",
  action: "action",
};

module.exports = {
  nodeTypes,
  conditions,
  useOperators,
  defaultActions,
};
