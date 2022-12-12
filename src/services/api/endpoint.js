import queryString from 'query-string';
import _ from 'lodash';

import api from './api';
import {Interface, AbstractClass} from './implementations';
import {ENDPOINT_PATHS} from './endpoint-constants';

// Interface for implementing APIs
// Attach to interface all methods defined in endpoint-constants.js
const ApiInterface = Interface(
    []
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
    addUser = (payload = {}) => {
        this.post(ENDPOINT_PATHS.USER, payload);
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
