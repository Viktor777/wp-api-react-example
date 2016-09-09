import React, {Component} from 'react';
import {connectEntity} from '../../api';
import Posts from './posts';

class Author extends Component {
    render() {
        let {
            data: author,
            sync
        } = this.props;

        return sync ? (
            <div>
                <header>
                    <img
                        src={author.avatarUrls[96]}
                        alt={author.name}
                    />
                    <h4>{author.name}</h4>
                    <p>
                        {author.description}
                    </p>
                </header>
                <Posts
                    params={{
                        author: author.id
                    }}
                />
            </div>
        ) : (
            <span>Loading</span>
        );
    }
}

export default connectEntity('users', {
    slug: ':slug'
})(Author);