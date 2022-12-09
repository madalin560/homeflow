import {ACTION_TYPES} from './actions';

const initialState = {
    userData: '',
    toasts: []
};

const appState = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER: {
            return Object.assign({}, state, {
                userData: action.payload
            });
        }
        case ACTION_TYPES.ADD_TOAST: {
            return Object.assign({}, state, {
                toasts: [...state.toasts, {
                    ...action.payload,
                    time: Date.now()
                }]
            });
        }
        case ACTION_TYPES.REMOVE_TOAST: {
            const openedToasts = [...state.toasts];
            const existingToastIndex = openedToasts.findIndex((toast) => toast.key === action.payload);

            if (existingToastIndex >= 0) {
                openedToasts.splice(existingToastIndex, 1);
            }

            return Object.assign({}, state, {
                toasts: openedToasts
            });
        }
        default: {
            return state;
        }
    }
};

export default appState;
