import {ADD, ADD_REQUEST} from '../actions/cache';
import update from 'react-addons-update';

let create = (state, action) => {

    if (!state[action]) {
        state = update(state, {
            [action]: {
                $set: {
                    id: {},
                    slug: {},
                    requests: {}
                }
            }
        });
    }

    return state;
};
export default (state = {}, {
    type,
    action,
    item,
    request,
    response
} = {
    type: null
}) => {
    switch (type) {
        case ADD:
            return update(create(state, action), {
                [action]: ['id', 'slug'].reduce((params, param) => {
                    params[param] = {
                        $merge: Array.isArray(item) ? item.reduce((items, current) => {
                            items[current[param]] = current;

                            return items;
                        }, {}) : {
                            [item[param]]: item
                        }
                    };

                    return params;
                }, {})
            });
        case ADD_REQUEST:
            return update(create(state, action), {
                [action]: {
                    requests: {
                        $merge: {
                            [request]: response
                        }
                    }
                }
            });
        default:
            return state;
    }
};