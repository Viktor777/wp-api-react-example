import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import rest from '../rest';
import cache from './cache';
import modify from 'wp-api-response-modify';

export default (reducer, query) => WrappedComponent => {
    class Collection extends Component {
        componentDidMount() {
            let {
                cache: {
                    findByRequest,
                    createRequest
                },
                dispatch
            } = this.props;
            let request = createRequest();
            let cache = findByRequest(request);

            if (!cache.sync) {
                dispatch(rest().actions[reducer](request));
            } else {
                this.forceUpdate();
            }

            return this;
        }
        render() {
            let {
                cache: {
                    findByRequest,
                    createRequest
                },
                [reducer]: {
                    data = [],
                    sync
                },
                params
            } = this.props;

            if (!data.length && params) {
                let cache = findByRequest(createRequest());

                if (cache.data) {
                    data = Array.isArray(cache.data) ? cache.data : [cache.data];
                    sync = cache.sync;
                }
            }

            return (
                <WrappedComponent
                    {...this.props}
                    data={data.map(entity => modify(entity))}
                    sync={sync}
                />
            );
        }
    }

    return hoistNonReactStatic(connect(state => ({
        [reducer]: state[reducer]
    }))(cache(reducer, query)(Collection)), WrappedComponent);
};