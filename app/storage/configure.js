import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {cache, reducers} from '../api';

export default initial => createStore(combineReducers(reducers()), initial, compose(
    applyMiddleware(thunk, cache),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));