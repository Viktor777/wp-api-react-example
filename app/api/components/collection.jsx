import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import rest from '../rest';
import root from './root';
import cache from './cache';
import modify from 'wp-api-response-modify';

export default (reducer, query = {
    id: ':id'
}) => WrappedComponent => {
    class Collection extends Component {
        componentDidMount() {
            let {
                cache: {
                    find,
                    createRequest
                },
                dispatch
            } = this.props;
            let request = createRequest();
            let {
                sync
            } = find(request);

            if (!sync) {
                dispatch(rest().actions[reducer](request));
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
                    data = [],
                    sync
                },
                params
            } = this.props;

            if (data && !Array.isArray(data)) {
                data = [data];
            }

            if (!data.length && params) {
                let cache = find(createRequest());

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
    }))(cache(reducer, query)(root(reducer)(Collection))), WrappedComponent);
};