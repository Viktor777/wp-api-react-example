import React, {Component} from 'react';
import {connectEntity} from '../../api';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Posts from './posts';

class Category extends Component {
    render() {
        let {
            data: category,
            sync
        } = this.props;

        return (
            <div>
                {sync ? (
                    <List>
                        <Subheader>{category.name}</Subheader>
                        <Posts
                            params={{
                                category: category.id
                            }}
                        />
                    </List>
                ) : 'Loading'}
            </div>
        );
    }
}

export default connectEntity('categories', {
    slug: ':slug'
})(Category);