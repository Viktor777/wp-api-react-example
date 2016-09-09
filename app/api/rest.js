import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import transformer from './utils/transformer';

const DAY = 24 * 60 * 60;
let options = {};
let api = null;

export default (endpoints = {}) => {

    if (api === null) {
        for (let key in endpoints) {
            if (endpoints.hasOwnProperty(key)) {
                options[key] = typeof endpoints[key] === 'string' ? {
                    url: endpoints[key],
                    transformer,
                    expiration: DAY
                } : Object.assign({
                    transformer,
                    expiration: DAY
                }, endpoints[key]);
            }
        }
        api = Object.assign(reduxApi(options)
            .use('fetch', adapterFetch(window.fetch)), {
            isExpired(reducer, timestamp) {
                return options[reducer].expiration < (Date.now() - timestamp) / 1000;
            }
        });
    }

    return api;
};