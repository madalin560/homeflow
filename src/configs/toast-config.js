const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
};

const TOASTS = {
  [TOAST_TYPES.SUCCESS]: {
    title: "Succes",
    delay: 2_000,
    className: "toast-success",
  },
  [TOAST_TYPES.ERROR]: {
    title: "Eroare",
    delay: 10_000,
    className: "toast-error",
  },
};

export { TOAST_TYPES, TOASTS };
