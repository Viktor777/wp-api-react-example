import React, {Component} from 'react';
import {Link} from 'react-router';
import {connectCollection} from '../api';
import {List, ListItem} from 'material-ui/List';

class Main extends Component {
    render() {
        let {
            data: categories,
            sync
        } = this.props;

        return (
            <List>
                {sync ? categories.map(({
                    name,
                    link
                }) => (
                    <ListItem
                        primaryText={name}
                        containerElement={<Link
                            to={link}
                        />}
                    />
                )) : 'Loading'}
            </List>
        );
    }
}

export default connectCollection('categories', {
    per_page: 10
})(Main);