import {ADD} from '../actions/cache';
import update from 'react-addons-update';

export default (state = {}, {
    type,
    reducer,
    request,
    response,
    timestamp
} = {
    type: null
}) => {
    switch (type) {
        case ADD:
            if (!state[reducer]) {
                state = update(state, {
                    [reducer]: {
                        $set: {}
                    }
                });
            }

            return update(state, {
                [reducer]: {
                    $merge: {
                        [request]: {
                            data: response,
                            _timestamp: timestamp
                        }
                    }
                }
            });
        default:
            return state;
    }
};