import rest from './rest';

export let initialize = rest;
export default () => rest().actions;
export reducers from './storage/reducers';
export cache from './storage/middlewares/cache';
export entity from './components/entity';
export collection from './components/collection';