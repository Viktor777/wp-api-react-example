import rest from '../../../api/rest';
import cache from './cache';
import update from 'react-addons-update';
import {ADD} from '../actions/store';
import transformer from '../../utils/transformer';

export default () => {
    let api = rest();
    let restReducers = api.reducers;
    let reducers = {
        cache
    };

    for (let reducer in restReducers) {
        if (restReducers.hasOwnProperty(reducer)) {
            reducers[reducer] = (state, action) => {
                let {
                    type,
                    item
                } = action;

                switch (type) {
                    case `${ADD}_${reducer}`:
                    {
                        let params = ['id', 'slug'];

                        params.forEach(param => {
                            if (!state[param]) {
                                state = update(state, {
                                    [param]: {
                                        $set: {}
                                    }
                                });
                            }
                        });
                        state = update(state, params.reduce((params, param) => {
                            params[param] = {
                                $merge: Array.isArray(item) ? item.reduce((items, current) => {
                                    items[current[param]] = current;

                                    return items;
                                }, {}) : {
                                    [item[param]]: item
                                }
                            };

                            return params;
                        }, {}));

                        break;
                    }
                    case api.events[reducer].actionReset:
                    {
                        return Object.assign({}, state, {
                            sync: false,
                            syncing: false,
                            loading: false,
                            data: transformer()
                        });
                    }
                }

                return restReducers[reducer](state, action);
            };
        }
    }

    return reducers;
};