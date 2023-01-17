import Cookie from 'services/cookies/Cookie';

const BASE_URL = 'http://localhost:8080/api';
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
        }
    }
}

export default api;