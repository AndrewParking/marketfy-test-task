import React, { PropTypes } from 'react';
import PortfolioItem from './PortfolioItem';


export default class PortfolioList extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        cash: PropTypes.number.isRequired,
        getSymbol: PropTypes.func.isRequired,
        symbol: PropTypes.string
    }

    render() {
        const { symbol } = this.props;
        let items = this.props.items.map(item => <PortfolioItem key={item.symbol} current={symbol === item.symbol}
                                                                getSymbol={this.props.getSymbol} item={item} />)

        return (
            <section className="col-md-7">
                <div className="section-heading">Current portfolio: <span className="label label-primary">$ {this.props.cash}</span></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Quantity</th>
                            <th>Price Paid</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
                {!items.length && <span className="alert alert-success symbol-replacer">You haven't bought any items yet :(</span>}
            </section>
        );
    }

}
