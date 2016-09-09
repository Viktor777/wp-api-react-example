import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import isDynamicParam from '../utils/is-dynamic-param';
import rest from '../rest';

export default (reducer, query = {
    id: ':id'
}) => WrappedComponent => {
    class Cache extends Component {
        createRequest() {
            let {
                params
            } = this.props;
            let request = {};

            for (let key in query) {
                if (query.hasOwnProperty(key)) {
                    if (isDynamicParam(query, key)) {
                        let param = query[key].slice(1);

                        request[key] = params[param];
                    } else {
                        request[key] = query[key];
                    }
                }
            }

            return request;
        }
        find(params) {
            let {
                cache
            } = this.props;
            let data = null;
            let sync = false;

            if (cache[reducer]) {
                let cached = cache[reducer][window.JSON.stringify(params)];

                if (cached && cached.data) {
                    data = cached.data;
                    sync = !!data && !rest().isExpired(reducer, cached._timestamp);
                }
            }

            return {
                data,
                sync
            };
        }
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    cache={{
                        createRequest: this.createRequest.bind(this),
                        find: this.find.bind(this)
                    }}
                />
            );
        }
    }

    return hoistNonReactStatic(connect(({
        cache
    }) => ({
        cache
    }))(Cache), WrappedComponent);
};