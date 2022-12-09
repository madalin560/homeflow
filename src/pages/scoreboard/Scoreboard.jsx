import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-bootstrap';
import {TrophyFill} from 'react-bootstrap-icons';
import _ from 'lodash';

import Endpoint from 'services/api/endpoint';
import {Panel} from 'components/layout/Panel';
import {Loader} from 'components/loader/Loader';
import {ResponsiveLayout} from 'components/responsive-layout/ResponsiveLayout';
import {Table} from 'components/table/Table';
import {NoDataCard} from 'components/cards/no-data-card/NoDataCard';
import {mergeArrays} from 'utils/utils';

const COLUMNS = [
    {
        header: 'Position',
        accessor: 'index'
    },
    {
        header: 'First Name',
        accessor: 'firstName'
    },
    {
        header: 'Last Name',
        accessor: 'lastName'
    },
    {
        header: 'Score',
        accessor: 'score'
    }
];

function Scoreboard(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [scores, setScores] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            const promises = [
                Endpoint.api.getUsers(),
                Endpoint.api.getScores()
            ];

            Promise.all(promises)
                .then(responses => {
                    const [usersData, scores] = responses;

                    const finalData = mergeArrays(
                        _.filter(usersData, (user) => user.firstName !== 'Open'),
                        _.filter(scores, (scoreObject) => scoreObject.score > 0),
                        '_id',
                        'user_id'
                    );

                    setScores(_.orderBy(finalData, 'score', 'desc'));
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setErrorMessage(_.get(error, 'message', 'Unknown Error'));
                });
        },
        []
    );

    const getTop3 = (scores) => {
        if (_.isEmpty(scores)) {
            return <NoDataCard customClass={'card-in-panel'} image={NoDataCard.IMAGE.NO_REWARD} title={"No user with points."} />;
        }

        return scores.slice(0, 3).map(data => (
            <div className="user-score">
                <div className="score">
                    {_.get(data, 'score', 0)}
                </div>
                <div className="text">
                    {data.firstName + ' ' + data.lastName}
                </div>
            </div>
        ));
    };

    const renderTop = useCallback(
        (minWidth) => {
            const header = (
                <div>
                    Top 3 users
                    <TrophyFill color="#ffc107" className="ml-3 mb-1" />
                </div>
            );

            return (
                <Panel size={Panel.SIZE.AUTO} title={header}>
                    {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                    <h6 className="mb-4">
                        Being among top 3 users will get you a prize at the end of the season!
                        <br/> <br/>
                        Thank you for making skiing better for our community.
                    </h6>
                    {getTop3(scores)}
                </Panel>
            );
        },
        [errorMessage, scores]
    );

    const renderTablePanel = useCallback(
        (panelSize) => (
            <Panel size={panelSize} title={'Scoreboard'}>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                {
                    _.isEmpty(scores)
                        ? <NoDataCard customClass={'card-in-panel'} image={NoDataCard.IMAGE.NO_POINTS} title={"No user with points. Help the community and get rewarded!"} />
                        : <Table columns={COLUMNS} data={scores} />
                }
            </Panel>
        ),
        [errorMessage, scores]
    );

    if (isLoading) {
        return <Loader />;
    }

    return (
        <React.Fragment>
            <ResponsiveLayout
                breakpoint={986}
                renderDesktop={() => (
                    <React.Fragment>
                        {renderTop(400)}
                        {renderTablePanel(Panel.SIZE.FLUID)}
                    </React.Fragment>
                )}
                renderMobile={() => (
                    <div className="flex-column vw-100">
                        {renderTop(300)}
                        {renderTablePanel(Panel.SIZE.AUTO)}
                    </div>
                )}
            />
        </React.Fragment>
    );
}

export {Scoreboard};
