import React from 'react';

import {Loader} from 'components/loader/Loader';

function LoadingCard() {
    return (
        <div className="card">
            <Loader />
        </div>
    );
}

export {LoadingCard};
