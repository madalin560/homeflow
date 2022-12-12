const ENDPOINT_PATHS = {
    // Users Crud
    USER_DATA: 'user/{0}',
    USER: 'user',
    DELETE_USER: 'user/delete/{0}',

    // Family Crud
    FAMILY_DATA: 'family/{0}',
    FAMILY: 'family',
    ADD_USER_TO_FAMILY: 'family/add/{0}/{1}',
    DELETE_USER_FROM_FAMILYU: 'family/delete/{0}/{1}',

    // Task Crud
    TASK_DATA: 'task/{0}',
    TASK: 'task'
};

export {
    ENDPOINT_PATHS
};
