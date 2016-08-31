import React, { PropTypes } from 'react';


export default class PortfolioItem extends React.Component {

    static propTypes = {
        item: PropTypes.shape({
            symbol: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            pricePaid: PropTypes.number.isRequired
        }).isRequired,
        getSymbol: PropTypes.func.isRequired,
        current: PropTypes.bool.isRequired
    };

    render() {
        const { current } = this.props;
        const { name, quantity, pricePaid, symbol } = this.props.item;

        return (
            <tr className={current ? 'current' : ''}>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>{pricePaid}</td>
                <td><button onClick={this.props.getSymbol.bind(null, symbol)} className="btn btn-default">View Stock</button></td>
            </tr>
        );
    }

}
