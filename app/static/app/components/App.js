import React from 'react';
import Header from './Header';
import PortfolioList from './PortfolioList';
import SymbolInfo from './SymbolInfo';
import ErrorNotification from './ErrorNotification';


export default class App extends React.Component {

    /* Here and in other components we are not using component lifecycle API just because there is no case for it. */

    checkIfCanAfford(symbolData, userData, inputVal) {
        if (!symbolData) return false;
        if (!inputVal) return false;

        const { askPrice } = symbolData;

        return inputVal * askPrice <= userData.cash;
    }

    checkIfCanSell(symbolData, userData, inputVal) {
        const item = userData.items.find(item => item.symbol === symbolData.symbol);

        return inputVal > 0 && Boolean(item) && item.quantity >= inputVal;
    }

    render() {
        let symbolData = this.props.symbolData,
            userData = this.props.userData,
            symbol = symbolData ? symbolData.symbol : null,
            canBuy = this.checkIfCanAfford(symbolData, userData, this.props.inputVal),
            // canSell = this.props.inputVal > 0 && Boolean(userData.items.find(item => item.symbol === symbolData.symbol));
            canSell = this.checkIfCanSell(symbolData, userData, this.props.inputVal);

        const { getSymbol, error, skipError, buyItem, sellItem, updateInput, inputVal } = this.props;

        return (
            <main className="container">
                <Header symbol={symbol} getSymbol={getSymbol} />
                <ErrorNotification error={error} skipError={skipError} />
                <section className="row">
                    <SymbolInfo symbolData={symbolData} canSell={canSell} canBuy={canBuy}
                                updateInput={updateInput} buyItem={buyItem} sellItem={sellItem} inputVal={inputVal} />
                    <div className="col-md-1"></div>
                    <PortfolioList items={userData.items} cash={userData.cash} getSymbol={getSymbol} symbol={symbol} />
                </section>
            </main>
        );
    }

}
