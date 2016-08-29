import rest from './rest';

export let initialize = rest;
export reducers from './storage/reducers';
export middleware from './storage/middleware';
export connectEntity from './components/entity';
export connectCollection from './components/collection';