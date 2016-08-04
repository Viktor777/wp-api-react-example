export let ADD = 'CACHE_ADD';
export let ADD_REQUEST = 'CACHE_ADD_REQUEST';
export let add = (action, item) => ({
    type: ADD,
    action,
    item
});
export let addRequest = (action, request, response) => ({
    type: ADD_REQUEST,
    action,
    request,
    response
});