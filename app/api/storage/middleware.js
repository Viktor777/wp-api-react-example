import {add as cache} from './actions/cache';
import {add as store} from './actions/store';

export default ({
    dispatch,
    getState
}) => next => action => {
    let reg = /^@@redux-api@/;

    if (action.type.match(reg)) {
        let type = action.type.replace(reg, '');

        reg = /_success$/;

        if (type.match(reg)) {
            type = type.replace(reg, '');
            dispatch(store(type, action.data));
            dispatch(cache(type, window.JSON.stringify(action.request.pathvars), action.data));
        }
    }

    return next(action);
};