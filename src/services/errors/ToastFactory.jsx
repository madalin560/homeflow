import React, {useMemo} from 'react';
import {Toast} from 'react-bootstrap';

import ToastService from './ToastService';
import {TOAST_TYPES} from "../../constants/constants";

const closeToast = (key) => {
    ToastService.removeToast(key);
};

function ToastFactory(props) {
    const toastList = useMemo(
        () => (
            props.toasts.map(toast => (
                <Toast
                    key={toast.key}
                    className={ToastFactory.STYLE[toast.type]}
                    show={true}
                    onClose={() => closeToast(toast.key)}
                >
                    <Toast.Header>
                        <strong className="mr-auto">{toast.type}</strong>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            ))
        ),
        [props.toasts]
    );

    return (
        <div className="toasts-wrapper">
            {toastList}
        </div>
    );
}

ToastFactory.STYLE = {
    [TOAST_TYPES.ERROR]: 'toast-error',
    [TOAST_TYPES.POINT_SCORED]: 'toast-success',
    [TOAST_TYPES.VOTE_REGISTERED]: 'toast-success'
};

export {ToastFactory};
