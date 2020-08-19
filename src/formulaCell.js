import jsonLogic from "json-logic-js";

export const FormulaCell = ({ data, formula }) => {
  return jsonLogic.apply(formula, data);
};
