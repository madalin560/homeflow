import queryString from 'query-string';
import _ from 'lodash';

import api from './api';
import {Interface, AbstractClass} from './implementations';
import {ENDPOINT_PATHS, METHOD_NAMES} from './endpoint-constants';

// Interface for implementing APIs
// Attach to interface all methods defined in endpoint-constants.js
const ApiInterface = Interface(
    METHOD_NAMES
);

// Abstract API class. Abstract methods are 'get', 'post'
// Methods are left for concrete class implementation
class AbstractAPI extends AbstractClass(ApiInterface, [
    'get',
    'post'
]) {}

// Implement each API method
class Implementation extends AbstractClass(AbstractAPI, []) {
    /**
     * Example of API call, using arrow function to auto-bind the method to the class
     *  @example
     *  @returns {promise} promise API promise
     *
     *  searchMovies = (params = {}) => {
     *      return this.get(PATHS.SEARCH_MOVIE, params);
     *  };
     * @param payload
     **/

    changePassword = (payload = {}) => {
        return this.post(ENDPOINT_PATHS.CHANGE_PASSWORD, payload);
    };

    login = (payload = {}) => {
        return this.post(ENDPOINT_PATHS.LOGIN, payload);
    };

    register = (payload = {}) => {
        return this.post(ENDPOINT_PATHS.USERS, payload);
    };

    getUsers = () => {
        return this.get(ENDPOINT_PATHS.USERS);
    };

    getUserHistory = () => {
        return this.get(ENDPOINT_PATHS.HISTORY);
    };

    getSlopes = (params = {}) => {
        return this.get(ENDPOINT_PATHS.SLOPES, params);
    };

    getSlopesByCoords = (pathVariables = []) => {
        return this.get(ENDPOINT_PATHS.SLOPES_BY_COORDS, {}, pathVariables);
    };

    addReport = (payload = {}) => {
        return this.post(ENDPOINT_PATHS.REPORTS, payload);
    };

    getReports = (pathParams = [], params = {}) => {
        return this.get(ENDPOINT_PATHS.REPORTS, params, pathParams);
    };

    getScores = () => {
        return this.get(ENDPOINT_PATHS.SCORES);
    };

    getUserData = () => {
        return this.get(ENDPOINT_PATHS.USER_DATA);
    };

    getUserReports = () => {
        return this.get(ENDPOINT_PATHS.USER_REPORTS);
    };

    getUserScore = () => {
        return this.get(ENDPOINT_PATHS.USER_SCORE);
    };

    resetPassword = (payload = {}) => {
        return this.post(ENDPOINT_PATHS.RESET_PASSWORD, payload);
    };

    voteReport = (payload = {}) => {
        return this.post(ENDPOINT_PATHS.VOTE_REPORT, payload);
    };
}

class HttpBasedAPI extends Implementation {
    getUrl(baseUrl, path, params) {
        const query = _.isEmpty(params) ? '' : `?${queryString.stringify(params)}`;
        return `${baseUrl}/${path}${query}`;
    }

    getParamUrl(baseUrl, path, pathVariables, params) {
        const requestPath = `${baseUrl}/${path}`
        const finalPath = requestPath.replace(/{([^{]+)}/g , (unused, varIndex) => pathVariables[varIndex]);
        const query = _.isEmpty(params) ? '' : `?${queryString.stringify(params)}`;
        return `${finalPath}${query}`
    }

    get(path, params, pathVariables) {
        const baseUrl = '/api';
        const url = this.getParamUrl(baseUrl, path, pathVariables, params);
        return api.get(url);
    }

    post(path, payload, params) {
        const baseUrl = '/api';
        const url = this.getUrl(baseUrl, path, params);
        return api.post(url, payload, params);
    }

    delete(path, pathVariables) {
        const baseUrl = '/api';
        const url = this.getParamUrl(baseUrl, path, pathVariables);
        return api.delete(url);
    }
}

/**
 * Using a proxy to expose api methods.
 *  @example
 *
 *  Endpoint.api.searchMovie(params).then(response => {
 *     ...working with the json response
 *  });
 */
let httpBasedHandler;
const Endpoint = new Proxy({api}, {
    get: function(obj, prop) {
        if (prop === 'api') {
            if (!httpBasedHandler) {
                httpBasedHandler = new HttpBasedAPI();
            }

            return httpBasedHandler;
        }

        return obj[prop];
    }
});

export default Endpoint;
