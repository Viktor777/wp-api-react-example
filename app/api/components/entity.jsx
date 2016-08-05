import React, {Component} from 'react';
import {connect} from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import rest from '../rest';
import cache from './cache';

export default (reducer, query) => WrappedComponent => {
    class Entity extends Component {
        componentDidMount() {
            let {
                cache: {
                    find,
                    findByRequest,
                    createRequest
                },
                dispatch,
                params
            } = this.props;
            let cache = find(params);

            if (!cache.sync) {
                let request = createRequest();
                let cache = findByRequest(request);

                if (!cache.sync) {
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
                    findByRequest,
                    createRequest
                },
                [reducer]: {
                    data = null,
                    sync
                },
                params
            } = this.props;

            if (!data && params) {
                let cache = find(params);

                data = cache.data;
                sync = cache.sync;

                if (!data) {
                    let cache = findByRequest(createRequest());

                    data = cache.data;
                    sync = cache.sync;
                }
            }

            return (
                <WrappedComponent
                    {...this.props}
                    data={data}
                    sync={sync}
                />
            );
        }
    }

    return hoistNonReactStatic(connect(state => ({
        [reducer]: state[reducer]
    }))(cache(reducer, query)(Entity)), WrappedComponent);
};