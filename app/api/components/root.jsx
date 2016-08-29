import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import rest from '../rest';

export default reducer => WrappedComponent => {
    class Root extends Component {
        componentWillUnmount() {
            this.props.dispatch(rest().actions[reducer].reset());

            return this;
        }
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }

    return hoistNonReactStatic(Root, WrappedComponent);
};