import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import transformer from './utils/transformer';

let options = {};

export default (endpoints = {}) => {

    for (let key in endpoints) {
        if (endpoints.hasOwnProperty(key)) {
            options[key] = typeof endpoints[key] === 'string' ? {
                url: endpoints[key],
                transformer
            } : Object.assign({
                transformer
            }, endpoints[key]);
        }
    }

    return reduxApi(options)
        .use('fetch', adapterFetch(window.fetch));
};