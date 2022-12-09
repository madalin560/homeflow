import ToastService from 'services/errors/ToastService';
import {POINTS_MAP, TOAST_TYPES, USER_ACTIONS} from 'constants/constants';

const handleSuccess = (callback, action) => {
    let [type, message] = [
        TOAST_TYPES.POINT_SCORED,
        `Congratulations! You got ${POINTS_MAP[action]} points for helping the community. Keep up the good work!`
    ];

    if (action === USER_ACTIONS.REPORT_INTERACTION) {
        [type, message] = [
            TOAST_TYPES.VOTE_REGISTERED,
            'Thank you for making skiing better for everyone!'
        ]
    }

    ToastService.addToast({
        type: type,
        data: message
    });
    callback();
}

const handleFail = (err) => {
    ToastService.addToast({
        type: TOAST_TYPES.ERROR,
        data: err.message
    });
};

const mergeArrays = (arr1, arr2, arr1Key, arr2Key) => {
    const merged = [];

    arr1.forEach(itm => {
        const common = arr2.find((item) => (item[arr2Key] === itm[arr1Key]) && item);

        if (common) {
            merged.push({
                ...common,
                ...itm
            });
        }
    });

    return merged;
};

export {handleSuccess, handleFail, mergeArrays};
