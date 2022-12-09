const METHOD_NAMES = [
    'changePassword',
    'login',
    'register',
    'getSlopes',
    'getReports',
    'addReport',
    'resetPassword',
    'getUserData',
    'getUserReports',
    'getUserScore',
    'getScores'
];

const ENDPOINT_PATHS = {
    CHANGE_PASSWORD: 'users/changepass',
    USER_DATA: 'users/currentUser',
    USER_REPORTS: 'reports/byUser',
    USER_SCORE: 'scores/byUser',
    USERS: 'users',
    LOGIN: 'users/login',
    HISTORY: 'history',
    SLOPES: 'slopes',
    SLOPES_BY_COORDS: 'slopes/{0}/{1}',
    REPORTS: 'reports',
    RESET_PASSWORD: 'users/forgotpass',
    SCORES: 'scores',
    VOTE_REPORT: 'interactions'
};

export {
    ENDPOINT_PATHS,
    METHOD_NAMES
};
