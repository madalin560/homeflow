import store from 'state/store';
import {addToast, removeToast} from 'state/actions';

class ToastService {
    static addToast(payload) {
        const toastPayload = {
            key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
            message: payload.data,
            type: payload.type
        };

        store.dispatch(addToast(toastPayload));
    }

    static removeToast(key) {
        store.dispatch(removeToast(key));
    }
}

export default ToastService;
