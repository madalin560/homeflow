import store from "store";
import { screenActions } from "store/actions/screens";

class ScreenService {
  static openScreen(payload) {
    store.dispatch(screenActions.openScreen(payload));
  }

  static closeScreen(screenId) {
    store.dispatch(screenActions.closeScreen(screenId));
  }
}

export { ScreenService };
