import React, {Component} from 'react';
import {Link} from 'react-router';
import {connectEntity} from '../../api';

class Author extends Component {
    render() {
        let {
            data: author,
            sync
        } = this.props;

        return sync ? (
            <header>
                <img
                    src={author.avatarUrls[48]}
                    alt={author.name}
                />
                <h4>
                    <Link
                        to={author.link}
                    >
                        {author.name}
                    </Link>
                </h4>
                <p>
                    {author.description}
                </p>
            </header>
        ) : (
            <span>Loading</span>
        );
    }
}

export default connectEntity('users')(Author);