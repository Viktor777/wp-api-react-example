import React, {Component} from 'react';
import {Link} from 'react-router';
import {connectCollection} from '../../api';
import FlatButton from 'material-ui/FlatButton';

class Categories extends Component {
    render() {
        let {
            data: categories,
            sync
        } = this.props;

        return (
            <div>
                {sync ? categories.map(({
                    name,
                    link
                }) => (
                    <FlatButton
                        containerElement={<Link
                            to={link}
                        />}
                        linkButton={true}
                        label={name}
                    />
                )) : 'Loading'}
            </div>
        );
    }
}

export default connectCollection('categories', {
    include: ':categories'
})(Categories);