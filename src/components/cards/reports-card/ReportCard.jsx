import React from 'react';
import {Badge, Button} from 'react-bootstrap';
import {HandThumbsUp, HandThumbsDown} from 'react-bootstrap-icons';
import moment from 'moment';

import {UsersOnlyGuard} from 'components/users-only-guard/UsersOnlyGuard';
import {CODE_REPORTS_MAP, REPORT_TYPE_LABELS} from 'configs/reports-config';

import '../Cards.scss';

function ReportCard({report, onVote}) {
    const handleVote = (voteType) => {
        const payload = {
            isLike: voteType,
            report_id: report['_id']
        };

        onVote(payload);
    };

    return (
        <div className="card">
            <h4>
                <Badge variant="secondary">
                    {REPORT_TYPE_LABELS[CODE_REPORTS_MAP[report.type]]}
                </Badge>
                {report.description}
            </h4>
            <div>
                - {moment(report.time).format('MMMM Do YYYY, h:mm:ss a')}
            </div>
            <UsersOnlyGuard>
                <div className="feedback-buttons">
                    <Button variant="primary" onClick={() => handleVote('1')}>
                        <HandThumbsUp className="mr-1" />
                        {
                            report.counter > 0
                                ? report.counter
                                : 0
                        }
                    </Button>
                    <Button variant="danger" onClick={() => handleVote('-1')}>
                        <HandThumbsDown />
                    </Button>
                </div>
             </UsersOnlyGuard>
        </div>
    );
}

export {ReportCard};
