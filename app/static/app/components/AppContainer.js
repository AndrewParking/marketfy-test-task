import { connect } from 'react-redux';
import { getSymbol, buyItem, sellItem, skipError, updateInput } from '../actions';
import App from './App';


const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        symbolData: state.symbol,
        error: state.error,
        inputVal: state.inputVal
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getSymbol: (symbol) => dispatch(getSymbol(symbol)),
        buyItem: (symbol, name, pricePaid, quantity) => dispatch(buyItem(symbol, name, pricePaid, quantity)),
        sellItem: (symbol, name, price, quantity) => dispatch(sellItem(symbol, name, price, quantity)),
        skipError: () => dispatch(skipError()),
        updateInput: value => dispatch(updateInput(value))
    };
};


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);


export default AppContainer;
