export let ADD = 'CACHE_ADD';
export let add = (reducer, request, response) => ({
    type: ADD,
    reducer,
    request,
    response,
    timestamp: Date.now()
});