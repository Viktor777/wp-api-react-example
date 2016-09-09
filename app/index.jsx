import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import configure from './storage/configure';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Main from './components/main';
import Home from './components/home';
import Category from './components/category';
import Author from './components/author';
import Single from './components/single';
import NotFound from './components/not-found';
import {initialize} from './api';

let initial = {};

initialize({
    categories: '/wp-api-react-example/wp-json/wp/v2/categories/:id',
    posts: {
        url: '/wp-api-react-example/wp-json/wp/v2/posts/:id',
        expiration: 5 * 60 // 5 min - for test
    },
    users: '/wp-api-react-example/wp-json/wp/v2/users/:id'
});
injectTapEventPlugin();
render((
    <Provider store={configure(initial)}>
        <Router history={browserHistory}>
            <Route path="/wp-api-react-example" component={Main}>
                <IndexRoute component={Home} />
                <Route path="/wp-api-react-example/category/:slug(/)" component={Category} />
                <Route path="/wp-api-react-example/author/:slug(/)" component={Author} />
                <Route path="/wp-api-react-example/:year/:month/:day/:slug(/)" component={Single} />
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));