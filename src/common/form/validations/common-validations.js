import _ from "lodash";

import { createValidation } from "./validations-utils";

const RULES = {
  required: createValidation({
    validation: (value) => !_.isNil(value),
    errorMessage: "Campul este necesar",
  }),
  notEmpty: createValidation({
    validation: (value) => !_.isEmpty(value),
    errorMessage: "Campul nu poate fi gol",
  }),
  integer: createValidation({
    validation: (value) => Math.trunc(value) === Number(value),
    errorMessage: "Campul trebuie sa fie un numar intreg",
  }),
  decimal: createValidation({
    validation: (value) =>
      RegExp(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/).test(value),
    errorMessage: "Campul trebuie sa fie un numar decimal",
  }),
  string: createValidation({
    validation: (value) => RegExp(/^[A-Za-z0-9? ,_-]+$/).test(value),
    errorMessage: "Campul trebuie sa fie un string",
  }),
  uppercaseString: createValidation({
    validation: (value) => RegExp(/^[A-ZÀ-Ú]+$/).test(value),
    errorMessage: "Campul trebuie sa fie un string uppercase",
  }),
};

export { RULES };
