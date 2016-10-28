import React, {Component} from 'react';
import {Link} from 'react-router';
import {connectCollection} from 'react-rest-press';

class Posts extends Component {
    render() {
        let {
            data: posts,
            sync
        } = this.props;

        return (
            <ul>
                {sync ? posts.map(({
                    title,
                    link
                }) => (
                    <li>
                        <Link
                            to={link}
                        >{title}</Link>
                    </li>
                )) : (
                    <li>Loading</li>
                )}
            </ul>
        );
    }
}

export default connectCollection('posts', {
    categories: ':category'
})(Posts);