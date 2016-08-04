import {add, addRequest} from '../actions/cache';

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
            dispatch(add(type, action.data));
            dispatch(addRequest(type, window.JSON.stringify(action.request.pathvars), action.data));
        }
    }

    return next(action);
};