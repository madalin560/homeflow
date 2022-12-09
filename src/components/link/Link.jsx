import React from 'react';

import './Link.scss';

function Link({children, onClick}) {
    return (
        <div className="link" onClick={onClick}>
            {children}
        </div>
    );
}

export {Link};
