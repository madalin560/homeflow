import store from "state/store";
import { toastActions } from "state/actions/toasts";

import { TOAST_TYPES } from "configs/toast-config";

class ToastService {
  static showSuccessToast() {
    const message = "Operațiunea a fost efectuată cu succes";
    const action = toastActions.showToast({
      type: TOAST_TYPES.SUCCESS,
      message,
    });
    store.dispatch(action);
  }

  static showErrorToast(reason = null) {
    const message = reason
      ? `Operația nu s-a putut efectua: ${reason}`
      : "Operația nu s-a putut efectua";
    const action = toastActions.showToast({
      type: TOAST_TYPES.ERROR,
      message,
    });
    store.dispatch(action);
  }

  static hideToast(toastId) {
    store.dispatch(toastActions.hideToast(toastId));
  }
}

export { ToastService };
