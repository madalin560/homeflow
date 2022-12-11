import store from "state/store";
import { modalActions } from "state/actions/modals";

class ModalService {
  static openModal(payload) {
    store.dispatch(modalActions.openModal(payload));
  }

  static closeModal(modalId) {
    store.dispatch(modalActions.closeModal(modalId));
  }
}

export { ModalService };
