import React, {Component} from 'react';
import {Link} from 'react-router';
import {connectCollection} from '../../api';
import {ListItem} from 'material-ui/List';

class Posts extends Component {
    render() {
        let {
            data: posts,
            sync
        } = this.props;

        return (
            <div>
                {sync ? posts.map(({
                    title,
                    link
                }) => (
                    <ListItem
                        primaryText={title}
                        containerElement={<Link
                            to={link}
                        />}
                    />
                )) : null}
            </div>
        );
    }
}

export default connectCollection('posts', {
    categories: ':category'
})(Posts);