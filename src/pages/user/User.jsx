import React, {useEffect, useState, useCallback} from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import {Check} from 'react-bootstrap-icons';
import {Alert} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

import Endpoint from 'services/api/endpoint';
import {Panel} from 'components/layout/Panel';
import {Loader} from 'components/loader/Loader';
import {Link} from 'components/link/Link';
import {ResponsiveLayout} from 'components/responsive-layout/ResponsiveLayout';
import {ResetPasswordModal} from './page-components/ResetPasswordModal';

import {useToggle} from 'utils/hook-utils';
import {CODE_REPORTS_MAP, REPORT_TYPE_LABELS} from 'configs/reports-config';

import 'FormFields.scss';

const formatPieChartData = (data) => {
    const reportsMap = {};

    data.forEach(report => {
        const reportType = CODE_REPORTS_MAP[report.type];

        if (reportsMap[reportType]) {
            reportsMap[reportType] += 1;
        } else {
            reportsMap[reportType] = 1;
        }
    });

    return Object.keys(reportsMap).map(key => ({
        name: REPORT_TYPE_LABELS[key],
        value: reportsMap[key]
    }));
};

const formatHistoricalData = (data) => {
    const reportsMap = {};

    data.forEach(report => {
        const reportTs = report.time;

        if (_.isEmpty(reportsMap)) {
            reportsMap[reportTs] = 1;
            return;
        }

        let newTs = true;
        for (const time in reportsMap) {
            if (moment(reportTs).diff(moment(time), 'days') < 1) {
                reportsMap[time] += 1;
                newTs = false;
            }
        }

        if (newTs) {
            reportsMap[reportTs] = 1;
        }
    });

    return Object.keys(reportsMap).map(key => ({
        time: moment(key).format('MMMM Do'),
        reports: reportsMap[key]
    }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function User(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [reportsData, setReportsData] = useState({});
    const [userData, setUserData] = useState({});
    const [userScore, setUserScore] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, toggleModal] = useToggle();

    useEffect(
        () => {
            const promises = [
                Endpoint.api.getUserData(),
                Endpoint.api.getUserHistory(),
                Endpoint.api.getUserScore()
            ];

            Promise.all(promises)
                .then(responses => {
                    const [userData, reportsData, scoreData] = responses;

                    setReportsData(reportsData);
                    setUserData(userData);
                    setUserScore(scoreData);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setErrorMessage(_.get(error, 'message', 'Unknown Error'));
                });
        },
        []
    )

    const renderCharts = useCallback(
        (minWidth) => (
            <Panel size={Panel.SIZE.AUTO} title={'My Stats'}>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <div className="user-score">
                    <div className="score">
                        {_.get(userScore, '[0].score', 0)}
                    </div>
                    <div className="text">
                        Points gathered
                    </div>
                </div>
                <h6>Reports opened by type</h6>
                <br />
                <ResponsiveContainer width="100%" height={300} minWidth={minWidth}>
                    <PieChart>
                        <Pie
                            data={formatPieChartData(reportsData)}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {
                                formatPieChartData(reportsData).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <h6>Reports opened in time</h6>
                <br />
                <ResponsiveContainer width="100%" height={300} minWidth={minWidth}>
                    <AreaChart
                        data={formatHistoricalData(reportsData)}
                        margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="reports" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </Panel>
        ),
        [errorMessage, reportsData, userScore]
    );

    const userPanel = useCallback(
        (panelSize) => (
            <Panel size={panelSize} title={'My account'}>
                {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                <div>Name: {userData.firstName + ' ' + userData.lastName}</div>
                <div>Email: {userData.email}</div>
                <br />
                <Link onClick={toggleModal}>Change my password</Link>
                <br />
                <br />
                <hr />
                <br />
                <br />
                <h4>
                    <strong>How to get rewarded</strong>
                </h4>
                <br />
                <p>
                    In OpenSnow you get rewarded for helping the community to get a better skiing experience by sharing issues or voting other reports
                </p>
                <ul style={{listStyle: "none", padding: 0}}>
                    <li>
                        <Check size={32} color="#2EB2C5" className="mr-1" />
                        You get 3 points for adding a report for a slope
                    </li>
                    <li>
                        <Check size={32} color="#2EB2C5" className="mr-1" />
                        You get 2 point when your vote is helping us remove reports which are no longer valid
                    </li>
                    <li>
                        <Check size={32} color="#2EB2C5" className="mr-1" />
                        You get 1 point every time someone likes your report
                    </li>
                </ul>
            </Panel>
        ),
        [toggleModal, errorMessage, userData]
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
                        {renderCharts(400)}
                        {userPanel(Panel.SIZE.FLUID)}
                    </React.Fragment>
                )}
                renderMobile={() => (
                    <div className="flex-column vw-100">
                        {renderCharts(300)}
                        {userPanel(Panel.SIZE.AUTO)}
                    </div>
                )}
            />
            <ResetPasswordModal showModal={showModal} toggleModal={toggleModal} />
        </React.Fragment>
    );
}

export {User};
