import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import rest from '../rest';
import root from './root';
import cache from './cache';
import modify from 'wp-api-response-modify';
import isDynamicParam from '../utils/is-dynamic-param';

export default (reducer, query = {
    id: ':id'
}) => WrappedComponent => {
    class Entity extends Component {
        find() {
            let {
                params,
                [reducer]: store
            } = this.props;
            let data = null;
            let sync = false;

            for (let key in query) {
                if (query.hasOwnProperty(key) && isDynamicParam(query, key)) {
                    let param = query[key].slice(1);

                    if (params.hasOwnProperty(param) && store[key]) {
                        data = store[key][params[param]];
                        sync = !!data && !rest().isExpired(reducer, data._timestamp);

                        return {
                            data,
                            sync
                        };
                    }
                }
            }

            return {
                data,
                sync
            };
        }
        componentDidMount() {
            let {
                cache: {
                    find,
                    createRequest
                },
                dispatch
            } = this.props;
            let {
                sync
            } = this.find();

            if (!sync) {
                let request = createRequest();
                let {
                    sync
                } = find(request);

                if (!sync) {
                    dispatch(rest().actions[reducer](request));
                } else {
                    this.forceUpdate();
                }
            } else {
                this.forceUpdate();
            }

            return this;
        }
        render() {
            let {
                cache: {
                    find,
                    createRequest
                },
                [reducer]: {
                    data = null,
                    sync
                },
                params
            } = this.props;

            if (!data && params) {
                let cache = this.find();

                data = cache.data;
                sync = cache.sync;

                if (!data) {
                    let cache = find(createRequest());

                    data = cache.data;
                    sync = cache.sync;
                }
            }

            return (
                <WrappedComponent
                    {...this.props}
                    data={data ? modify(data) : data}
                    sync={sync}
                />
            );
        }
    }

    return hoistNonReactStatic(connect(state => ({
        [reducer]: state[reducer]
    }))(cache(reducer, query)(root(reducer)(Entity))), WrappedComponent);
};