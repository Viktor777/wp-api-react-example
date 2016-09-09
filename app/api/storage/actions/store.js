export let ADD = 'STORE_ADD';
export let add = (reducer, item) => ({
    type: `${ADD}_${reducer}`,
    item,
    timestamp: Date.now()
});