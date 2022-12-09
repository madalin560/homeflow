import React from 'react';
import {Card} from 'react-bootstrap';

import ill2 from 'static/ill2.jpg';
import ill5 from 'static/ill5.jpg';
import ill8 from 'static/ill8.jpg';

function NoDataCard({image, title, customClass = ''}) {
    const classNames = ["card", customClass];

    return (
        <div className={classNames.join(' ')}>
            <Card.Img variant="top" src={image} />
            <h5 className="text-center">
                {title}
            </h5>
        </div>
    );
}

NoDataCard.IMAGE = {
    NO_REPORTS: ill5,
    NO_POINTS: ill8,
    NO_REWARD: ill2
}

export {NoDataCard};
