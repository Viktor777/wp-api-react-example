import React, {Component} from 'react';
import {Link} from 'react-router';
import {connectEntity} from '../../api';
import {CardHeader} from 'material-ui/Card';

class Single extends Component {
    render() {
        let {
            data: author,
            sync
        } = this.props;

        return (
            <div>
                {sync ? (
                    <CardHeader
                        title={author.name}
                        subtitle={author.description}
                        avatar={author.avatarUrls[48]}
                    >
                        <Link
                            to={author.link}
                        >
                            {author.name}
                        </Link>
                    </CardHeader>
                ) : 'Loading'}
            </div>
        );
    }
}

export default connectEntity('users')(Single);