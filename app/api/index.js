import rest from './rest';

export let initialize = rest;
export default () => rest().actions;
export reducers from './storage/reducers';
export cache from './storage/middlewares/cache';
export wrapper from './components/wrapper';
export model from './components/model';
export collection from './components/collection';