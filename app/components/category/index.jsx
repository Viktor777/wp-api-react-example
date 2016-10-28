import React, {Component} from 'react';
import {connectEntity} from 'react-rest-press';
import Posts from './posts';

class Category extends Component {
    render() {
        let {
            data: category,
            sync
        } = this.props;

        return sync ? (
            <div>
                <h1>{category.name}</h1>
                <Posts
                    params={{
                        category: category.id
                    }}
                />
            </div>
        ) : (
            <span>Loading</span>
        );
    }
}

export default connectEntity('categories', {
    slug: ':slug'
})(Category);