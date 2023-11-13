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

  return result;
};

const conditions = {
  AND: "&&",
  OR: "||",
};

const nodeTypes = {
  rule: "rule",
  action: "action",
};

const transformEvent = (event) => {
  const eventData = JSON.parse(event.data);
  const { transaction_id, amount, currency, gateway, type } = eventData.transaction;
  const { name } = eventData.user;
  const { country } = eventData.address;

  delete event.data
  const newEvent = {
    ...event,
    transaction_id,
    amount,
    currency,
    gateway,
    user: name,
    type,
    country
  };

  return newEvent
};

module.exports = {
  nodeTypes,
  conditions,
  useOperators,
  defaultActions,
  transformEvent
};
