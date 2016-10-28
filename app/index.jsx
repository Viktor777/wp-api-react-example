import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configure from './storage/configure';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Main from './components/main';
import Home from './components/home';
import Category from './components/category';
import Author from './components/author';
import Single from './components/single';
import NotFound from './components/not-found';
import {initialize} from 'react-rest-press';
import settings from './settings';

let initial = {};
let {
    path,
    rest: {
        url
    }
} = settings;
let api = `${url}wp/v2`;

initialize({
    categories: `${api}/categories/:id`,
    posts: {
        url: `${api}/posts/:id`,
        expiration: 5 * 60 // 5 min - for test
    },
    users: `${api}/users/:id`
});
render((
    <Provider store={configure(initial)}>
        <Router history={browserHistory}>
            <Route path={`${path}/`} component={Main}>
                <IndexRoute component={Home} />
                <Route path={`${path}/category/:slug(/)`} component={Category} />
                <Route path={`${path}/author/:slug(/)`} component={Author} />
                <Route path={`${path}/:year/:month/:day/:slug(/)`} component={Single} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));