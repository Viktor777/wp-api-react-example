import React, {Component} from 'react';
import {model} from '../../api';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Posts from './posts';

class Author extends Component {
    render() {
        let {
            data: author,
            sync
        } = this.props;

        return (
            <div>
                {sync ? (
                    <List>
                        <Subheader>
                            <Avatar
                                src={author.avatar_urls[96]}
                                size={96}
                            />
                            {author.name}
                        </Subheader>
                        <Posts
                            params={{
                                author: author.id
                            }}
                        />
                    </List>
                ) : 'Loading'}
            </div>
        );
    }
}

export default model('users', {
    slug: ':slug'
})(Author);