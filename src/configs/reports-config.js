import _ from 'lodash';

const REPORT_TYPE_MAP = {
    cableMalfunction: 0,
    fog: 1,
    wind: 2,
    blizzard: 3,
    frozenSlope: 4,
    crowded: 5,
    closedSlope: 6,
    poorSnow: 7
};

const REPORT_TYPE_LABELS = {
    cableMalfunction: "Cable Malfunction",
    fog: "Fog",
    wind: "Wind",
    blizzard: "Blizzard",
    frozenSlope: "Frozen Slope",
    crowded: "Crowded",
    closedSlope: "Closed Slope",
    poorSnow: "Poor snow"
};

const CODE_REPORTS_MAP = _.invert(REPORT_TYPE_MAP);

export {REPORT_TYPE_MAP, REPORT_TYPE_LABELS, CODE_REPORTS_MAP};
