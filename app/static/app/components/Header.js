import React, { PropTypes } from 'react';


export default class Header extends React.Component {

    static propTypes = {
        symbol: PropTypes.string,
        getSymbol: PropTypes.func.isRequired,
    }

    handleGetSymbol(event) {
        event.preventDefault();
        this.props.getSymbol(this.input.value);
    }

    render() {
        const { symbol, getSymbol } = this.props;

        return (
            <header className="row">
                <div className="header navbar-form navbar-left">
                    <h3 className="navbar-text">Simple Stock Exchange</h3>
                    <form onSubmit={::this.handleGetSymbol}>
                        <div className="form-group navbar-right">
                            <button type="submit" className="btn btn-success navbar-right">Lookup</button>
                            <input type="text" ref={inp => this.input = inp} defaultValue={symbol} className="form-control"/>
                        </div>
                    </form>
                </div>
            </header>
        );
    }

}
