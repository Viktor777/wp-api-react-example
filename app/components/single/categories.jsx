import React, {Component} from 'react';
import {Link} from 'react-router';
import {connectCollection} from '../../api';

class Categories extends Component {
    render() {
        let {
            data: categories,
            sync
        } = this.props;

        return (
            <ul>
                {sync ? categories.map(({
                    name,
                    link
                }) => (
                    <li>
                        <Link
                            to={link}
                        >{name}</Link>
                    </li>
                )) : (
                    <li>Loading</li>
                )}
            </ul>
        );
    }
}

export default connectCollection('categories', {
    include: ':categories'
})(Categories);