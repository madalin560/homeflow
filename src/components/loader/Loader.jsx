import React from 'react';
import {Spinner} from 'react-bootstrap';

import './Loader.scss';

function Loader(props) {
    return (
        <div className="loader-wrapper">
            <Spinner animation="border" />
        </div>
    )
}

export {Loader};
