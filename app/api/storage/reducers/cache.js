import {ADD} from '../actions/cache';
import update from 'react-addons-update';

export default (state = {}, {
    type,
    reducer,
    request,
    response
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
                        [request]: response
                    }
                }
            });
        default:
            return state;
    }
};