import React, {Component} from 'react';
import {connectEntity} from '../../api';
import Categories from './categories';
import Author from './author';

class Single extends Component {
    render() {
        let {
            data: post,
            sync
        } = this.props;

        return sync ? (
            <article>
                <h1>{post.title}</h1>
                <Author
                    params={{
                        id: post.author
                    }}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: post.content
                    }}
                />
                {post.categories.length && (
                    <Categories
                        params={{
                            categories: post.categories
                        }}
                    />
                )}
            </article>
        ) : (
            <span>Loading</span>
        );
    }
}

export default connectEntity('posts', {
    slug: ':slug'
})(Single);