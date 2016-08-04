import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import configure from './storage/configure';
import {Router, Route, browserHistory} from 'react-router';
import Home from './components/home';
import Category from './components/category';
import Author from './components/author';
import Single from './components/single';
import NotFound from './components/not-found';
import {initialize} from './api';

let initial = {};

initialize({
    categories: '/wp-api-react-example/wp-json/wp/v2/categories/:id',
    posts: '/wp-api-react-example/wp-json/wp/v2/posts/:id',
    users: '/wp-api-react-example/wp-json/wp/v2/users/:id'
});
injectTapEventPlugin();
render((
    <Provider store={configure(initial)}>
        <Router history={browserHistory}>
            <Route path="/wp-api-react-example" component={Home}>
                <Route path="/wp-api-react-example/category/:slug(/)" component={Category} />
                <Route path="/wp-api-react-example/author/:slug(/)" component={Author} />
                <Route path="/wp-api-react-example/:year/:month/:day/:slug(/)" component={Single} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));