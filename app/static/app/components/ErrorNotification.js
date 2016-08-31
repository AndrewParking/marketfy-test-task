import React, { PropTypes } from 'react';


export default class ErrorNotification extends React.Component {

    static propTypes = {
        error: PropTypes.string.isRequired,
        skipError: PropTypes.func.isRequired
    }

    render() {
        return this.props.error ? (
            <div className="alert alert-danger" onClick={() => this.props.skipError()}>{this.props.error}</div>
        ) : null;
    }

}
