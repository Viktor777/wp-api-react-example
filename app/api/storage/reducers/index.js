import rest from '../../../api/rest';
import cache from './cache';

export default () => Object.assign(rest().reducers, {cache});