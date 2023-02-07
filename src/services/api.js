import Cookie from 'services/cookies/Cookie';

const BASE_URL = '/api';
const USER = 'users';
const FAMILY = 'families';
const TASK = 'tasks';

const getCredentials = () => {
    return Cookie.getCookieByName('AUTH');
}

const api = {
    user: {
        login: async (username, password) => {
            return fetch(BASE_URL + '/' + USER + '/' + username, {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
                }
            }).then((result) => {
                return result;
            }).catch((error) => {
                console.error(error);
            });
        },
        getUser: (username) => {
            return fetch(BASE_URL + '/' + USER + '/' + username, {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + getCredentials()
                }
            });
        },
        addUser: (username, password) => {
            return fetch(BASE_URL + '/' + USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: username, password: password})
            });
        },
        updateUser: (username, firstName, lastName, email, phone, familyId) => {
            return fetch(BASE_URL + '/' + USER + '/' + username, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + getCredentials()
                },
                body: JSON.stringify({firstName: firstName, lastName: lastName, email: email, phone: phone, familyId: familyId})
            });
        }
    },
    task: {
        getTasksInFamily: (familyId) => {
            return fetch(BASE_URL + '/' + TASK + '/' + "family" + '/' + familyId, {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + getCredentials()
                }
            });
        },
        addTask: (name, state, familyId, assigneeName) => {
            return fetch(BASE_URL + '/' + TASK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + getCredentials()
                },
                body: JSON.stringify({name: name, state: state, familyId: familyId, assigneeName: assigneeName})
            });
        },
        updateTask: (id, name, state, familyId, assigneeName) => {
            return fetch(BASE_URL + '/' + TASK + '/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + getCredentials()
                },
                body: JSON.stringify({name: name, state: state, familyId: familyId, assigneeName: assigneeName})
            });
        },
        deleteTask: (id) => {
            return fetch(BASE_URL + '/' + TASK + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + getCredentials()
                },
            });
        }
    },
    family: {
        createFamily: (familyName, userName) => {
            return fetch(BASE_URL + '/' + FAMILY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + getCredentials()
                },
                body: JSON.stringify({name: familyName, membersList: [userName]})
            });
        },
        getFamilyById: (familyId) => {
            return fetch(BASE_URL + '/' + FAMILY + '/' + familyId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + getCredentials()
                }
            });
        },
        addToFamily: (familyId, username) => {
            return fetch(BASE_URL + '/' + FAMILY + '/add/' + familyId + '/' + username, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + getCredentials()
                }
            })
        },
        removeFromFamily: (familyId, username) => {
            return fetch(BASE_URL + '/' + FAMILY + '/delete/' + familyId + '/' + username, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + getCredentials()
                }
            })
        }
    }
}

export default api;
