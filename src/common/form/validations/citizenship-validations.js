import { createValidation } from "./validations-utils";
import { RULES } from "./common-validations";
import { TEXT } from "constants/dictionary";

/*
 * List of countries for which we perform explicit citizenship validation.
 * These should match values from the citizenships seed file
 */
const CITIZENSHIP_COUNTRY = {
  ROMANIA: "România",
};

const ROMANIAN_REGEX =
  /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99|80)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/;

/**
 * Get form validations based on citizenship country value
 * @param {string} country - Citizenship country
 * @returns {array} List of validations to be used for the rules prop
 */
const getCitizenshipValidation = (country) => {
  // Base validation
  const validations = [RULES.required];

  switch (country) {
    case CITIZENSHIP_COUNTRY.ROMANIA:
      validations.push(
        createValidation({
          validation: (value) => ROMANIAN_REGEX.test(value),
          errorMessage: TEXT.citizenshipFormatInvalid,
        })
      );
      break;
    default:
      break;
  }

  return validations;
};

export { getCitizenshipValidation };
