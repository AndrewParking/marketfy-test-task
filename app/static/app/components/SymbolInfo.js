import React, { PropTypes } from 'react';


export default class SymbolInfo extends React.Component {

    static propTypes = {
        symbolData: PropTypes.shape({
            symbol: PropTypes.string,
            name: PropTypes.string,
            bidPrice: PropTypes.number,
            askPrice: PropTypes.number
        }),
        buyItem: PropTypes.func.isRequired,
        sellItem: PropTypes.func.isRequired,
        updateInput: PropTypes.func.isRequired,
        canSell: PropTypes.bool.isRequired,
        canBuy: PropTypes.bool.isRequired,
        inputVal: PropTypes.number
    }

    handleInputUpdate() {
        this.props.updateInput(this.input.value);
    }

    handleBuyItem() {
        let quantity = Number.parseInt(this.input.value),
            data = this.props.symbolData,
            pricePaid = Number.parseFloat(data.askPrice);

        this.props.buyItem(data.symbol, data.name, pricePaid, quantity);
    }

    handleSellItem() {
        let quantity = Number.parseInt(this.input.value),
            data = this.props.symbolData,
            price = Number.parseFloat(data.bidPrice);

        this.props.sellItem(data.symbol, data.name, price, quantity);
    }

    render() {
        let data = this.props.symbolData;

        return data.symbol ? (
            <section className="col-md-4">
                <div className="section-heading">{data.name} ({data.symbol})</div>
                <table className="table symbol-table">
                    <thead>
                        <tr>
                            <th>Bid</th>
                            <th>Ask</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.bidPrice}</td>
                            <td>{data.askPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="buy-sell-section navbar-form">
                    <input type="number" ref={inp => this.input = inp} onChange={::this.handleInputUpdate}
                           value={this.props.inputVal || 0} className="form-control" />
                    <button className="btn btn-primary" onClick={::this.handleBuyItem} disabled={!this.props.canBuy}>Buy</button>
                    <button className="btn btn-success" onClick={::this.handleSellItem} disabled={!this.props.canSell}>Sell</button>
                </div>
            </section>
        ) : (
            <section className="col-md-4"><span className="alert alert-info symbol-replacer">Please, select the symbol</span></section>
        );
    }

}
