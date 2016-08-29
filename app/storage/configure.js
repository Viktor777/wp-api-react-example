import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {middleware, reducers} from '../api';

export default initial => createStore(combineReducers(reducers()), initial, compose(
    applyMiddleware(thunk, middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));