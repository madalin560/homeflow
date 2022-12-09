export const ACTION_TYPES = {
    ADD_TOAST: 'addToast',
    REMOVE_TOAST: 'removeToast',
    SET_USER: 'setUser'
};

const addToast = (payload) => ({
    type: ACTION_TYPES.ADD_TOAST,
    payload: payload
});

const removeToast = (key) => ({
    type: ACTION_TYPES.REMOVE_TOAST,
    payload: key
});

const setUser = (userData) => ({
    type: ACTION_TYPES.SET_USER,
    payload: {
        userData
    }
});

export {
    addToast,
    removeToast,
    setUser
};
