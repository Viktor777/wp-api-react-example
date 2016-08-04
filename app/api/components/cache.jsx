import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import rest from '../rest';

export default (reducer, query) => WrappedComponent => {
    class Cache extends Component {
        static get query() {
            return query ? Object.assign({}, query) : {
                id: ':id'
            };
        }
        static isDynamicParam(param) {
            return Cache.query[param][0] === ':';
        }
        createRequest() {
            let params = this.props.params;
            let request = {};

            for (let key in query) {
                if (query.hasOwnProperty(key)) {
                    if (this.constructor.isDynamicParam(key)) {
                        let param = query[key].slice(1);

                        request[param] = params[param];
                    } else {
                        request[key] = query[key];
                    }
                }
            }

            return request;
        }
        find(params) {
            let cache = this.props.cache;
            let data = null;
            let sync = false;
            let query = this.constructor.query;

            for (let key in query) {
                if (query.hasOwnProperty(key) && this.constructor.isDynamicParam(key)) {
                    let param = query[key].slice(1);

                    if (params.hasOwnProperty(param) && cache[reducer] && cache[reducer][key]) {
                        data = cache[reducer][key][params[param]];
                        sync = !!data;

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
        findByRequest(params) {
            let cache = this.props.cache;
            let data = null;
            let sync = false;

            if (cache[reducer] && cache[reducer].requests) {
                data = cache[reducer].requests[window.JSON.stringify(params)];
                sync = !!data;
            }

            return {
                data,
                sync
            };
        }
        componentWillUnmount() {
            this.props.dispatch(rest().actions[reducer].reset());

            return this;
        }
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    cache={{
                        createRequest: this.createRequest.bind(this),
                        find: this.find.bind(this),
                        findByRequest: this.findByRequest.bind(this)
                    }}
                />
            );
        }
    }

    return hoistNonReactStatic(connect(state => ({
        cache: state.cache
    }))(Cache), WrappedComponent);
};