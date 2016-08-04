import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import rest from '../rest';

export default options => {
    let reducers = new Map();

    reducers.set(options.reducer, options);

    return WrappedComponent => {
        class Wrapper extends Component {
            static isRootReducer(reducer) {
                return options.reducer === reducer;
            }
            static isDynamicParam(query, key) {
                return query[key][0] === ':';
            }
            static get mainQuery() {
                return options.query ? Object.assign({}, options.query) : {
                    id: ':id'
                };
            }
            getFromCache(reducer, query, params) {
                let cache = this.props.cache;
                let data = null;
                let sync = false;

                for (let key in query) {
                    if (query.hasOwnProperty(key) && this.constructor.isDynamicParam(query, key)) {
                        let param = query[key].slice(1);

                        if (params.hasOwnProperty(param) && cache[reducer] && cache[reducer][key]) {
                            data = cache[reducer][key][params[param]];
                            sync = !!data;

                            break;
                        }
                    }
                }

                return {
                    data,
                    sync
                };
            }
            getFromCacheByQuery(reducer, query) {
                let cache = this.props.cache;
                let data = null;
                let sync = false;

                if (cache[reducer] && cache[reducer].requests) {
                    data = cache[reducer].requests[window.JSON.stringify(query)];
                    sync = !!data;
                }

                return {
                    data,
                    sync
                };
            }
            componentDidMount() {
                let query = this.constructor.mainQuery;
                let {
                    dispatch,
                    params
                } = this.props;
                let cache = this.getFromCache(options.reducer, this.constructor.mainQuery, params);

                if (!cache.sync) {
                    let cache;

                    for (let key in query) {
                        if (query.hasOwnProperty(key) && this.constructor.isDynamicParam(query, key) && params.hasOwnProperty(key)) {
                            query[key] = params[key];
                        }
                    }
                    cache = this.getFromCacheByQuery(options.reducer, query);

                    if (!cache.sync) {
                        dispatch(rest().actions[options.reducer](query));
                    } else {
                        this.forceUpdate();
                    }
                } else {
                    this.forceUpdate();
                }

                return this;
            }
            componentDidUpdate() {
                let {
                    dispatch,
                    params,
                    [options.reducer]: {
                        data,
                        sync
                    }
                } = this.props;

                if (!sync) {
                    let cache = this.getFromCache(options.reducer, this.constructor.mainQuery, params);

                    data = cache.data;
                    sync = cache.sync;
                }

                if (sync) {
                    reducers.forEach(({
                        query
                    }, reducer) => {
                        if (!this.constructor.isRootReducer(reducer) && !this.props[reducer].sync) {
                            let cache;

                            query = query ? Object.assign({}, query) : {
                                [options.reducer]: ':id'
                            };
                            cache = this.getFromCache(reducer, query, data);

                            if (!cache.sync) {
                                let cache;

                                for (let key in query) {
                                    if (query.hasOwnProperty(key) && this.constructor.isDynamicParam(query, key)) {
                                        query[key] = data[query[key].slice(1)];
                                    }
                                }
                                cache = this.getFromCacheByQuery(reducer, query);

                                if (!cache.sync) {
                                    dispatch(rest().actions[reducer](query));
                                }
                            }
                        }
                    });
                }

                return this;
            }
            componentWillUnmount() {
                reducers.forEach((args, reducer) => this.props.dispatch(rest().actions[reducer].reset()));

                return this;
            }
            render() {
                let api = {};

                reducers.forEach(({
                    collection = false,
                    query
                }, reducer) => {
                    let isRoot = this.constructor.isRootReducer(reducer);
                    let params = isRoot ? this.props.params : api.data;

                    if (query) {
                        query = Object.assign({}, query);
                    } else if (isRoot) {
                        query = {
                            [options.reducer]: ':id'
                        };
                    } else {
                        query = {
                            id: ':id'
                        };
                    }

                    if (collection) {
                        let {
                            data = [],
                            sync
                        } = this.props[reducer];

                        if (!data.length && params) {
                            let cache;

                            for (let key in query) {
                                if (query.hasOwnProperty(key) && this.constructor.isDynamicParam(query, key)) {
                                    query[key] = params[query[key].slice(1)];
                                }
                            }
                            cache = this.getFromCacheByQuery(reducer, query);
                            data = cache.data || [];
                            sync = cache.sync;
                        }
                        api[reducer] = {
                            data,
                            sync
                        };

                        if (!Array.isArray(api[reducer].data)) {
                            api[reducer].data = [api[reducer].data];
                        }
                    } else {
                        let {
                            data = null,
                            sync
                        } = this.props[reducer];

                        if (!data && params) {
                            let cache = this.getFromCache(reducer, query, params);

                            data = cache.data;
                            sync = cache.sync;

                            if (!sync) {
                                let cache;

                                for (let key in query) {
                                    if (query.hasOwnProperty(key) && this.constructor.isDynamicParam(query, key)) {
                                        query[key] = params[query[key].slice(1)];
                                    }
                                }
                                cache = this.getFromCacheByQuery(reducer, query);
                                data = cache.data;
                                sync = cache.sync;
                            }
                        }

                        if (isRoot) {
                            api.data = data;
                            api.sync = sync;
                        } else {
                            api[reducer] = {
                                data,
                                sync
                            };
                        }
                    }
                });

                return (
                    <WrappedComponent
                        {...this.props}
                        api={api}
                    />
                );
            }
        }

        return hoistNonReactStatic(connect(state => options.children.reduce((children, current) => {
            let {
                reducer
            } = current;

            if (state[reducer]) {
                children[reducer] = state[reducer];
                reducers.set(reducer, current);
            }

            return children;
        }, {
            [options.reducer]: state[options.reducer],
            cache: state.cache
        }))(Wrapper), WrappedComponent);
    };
};