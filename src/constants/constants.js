const MAP_OPTIONS = {
    overviewMapControl: true,
    streetViewControl: false,
    rotateControl: false,
    mapTypeControl: false,
};

const TOAST_TYPES = {
    ERROR: 'Error',
    POINT_SCORED: 'Points Scored',
    VOTE_REGISTERED: 'Vote Registered'
}

const USER_ACTIONS = {
    REPORT_ADD: 'reportAdd',
    REPORT_INTERACTION: 'reportInteraction'
};

const POINTS_MAP = {
    [USER_ACTIONS.REPORT_ADD]: 3,
    [USER_ACTIONS.REPORT_INTERACTION]: 1
};

export {
    MAP_OPTIONS,
    TOAST_TYPES,
    USER_ACTIONS,
    POINTS_MAP
};
