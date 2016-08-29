import React, {Component} from 'react';
import {connectEntity} from '../../api';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Categories from './categories';
import Author from './author';

class Single extends Component {
    render() {
        let {
            data: post,
            sync
        } = this.props;

        return (
            <div>
                {sync ? (
                    <Card>
                        <Author
                            params={{
                                id: post.author
                            }}
                        />
                        <CardTitle
                            title={post.title}
                        />
                        <CardText
                            dangerouslySetInnerHTML={{
                                __html: post.content
                            }}
                        />
                        {post.categories.length && (
                            <CardActions>
                                <Categories
                                    params={{
                                        categories: post.categories
                                    }}
                                />
                            </CardActions>
                        )}
                    </Card>
                ) : 'Loading'}
            </div>
        );
    }
}

export default connectEntity('posts', {
    slug: ':slug'
})(Single);