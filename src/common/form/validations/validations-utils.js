function createValidation({ validation, errorMessage, ...restOfRules }) {
  return {
    ...restOfRules,
    validator: (_allRules, value) => {
      const error = !validation(value) ? errorMessage || true : false;

      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },
  };
}

export { createValidation };
