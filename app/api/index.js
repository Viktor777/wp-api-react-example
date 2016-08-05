import rest from './rest';

export let initialize = rest;
export default () => rest().actions;
export reducers from './storage/reducers';
export cache from './storage/middlewares/cache';
export connectEntity from './components/entity';
export connectCollection from './components/collection';