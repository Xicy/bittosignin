import { orderExecute } from '@openware/core-data';
import * as React from 'react';
import { connect } from 'react-redux';
import {
    OneClickCurrencySwitch,
    OneClickCustomOrder,
    OneClickOrder,
    OneClickOrderOption,
    OrderExecute,
} from '../../components';
import { Titled } from '../../decorators';

const sideOptions = [
    { label: 'Buy Bitto', value: 'buy' },
    { label: 'Sell Bitto', value: 'sell' },
];

const cryptoCurrencyOptions = [
    { label: 'btc', value: 'btc' },
    { label: 'eth', value: 'eth' },
];

const currencyOptions = [
    { label: 'usd', value: 'usd' },
    { label: 'vnd', value: 'vnd' },
    { label: 'gbp', value: 'gbp' },
    { label: 'krw', value: 'krw' },
];

const currencySymbols = {
    usd: '$',
    vnd: '₫',
    gbp: '£',
    krw: '₩',
};

interface DispatchProps {
    orderExecute: (order: OrderExecute) => void;
}

type Props = DispatchProps;
type Side = 'buy' | 'sell';

interface State {
    side: Side;
    cryptoCurrency: string;
    currency: string;
    [key: string]: string;
}

class OneClickTrade extends React.Component<Props, State> {
    public state = {
        side: 'buy' as Side,
        cryptoCurrency: 'btc',
        currency: 'usd',
    };

    public render() {
        const {
            side,
            cryptoCurrency,
            currency,
        } = this.state;
        return (
            <div className="bitto-one-click-trade">
                <OneClickCurrencySwitch
                    currencyOptions={currencyOptions}
                    cryptoCurrencyOptions={cryptoCurrencyOptions}
                    onCryptoCurrencySelect={this.handleOptionChange('cryptoCurrency')}
                    onCurrencySelect={this.handleOptionChange('currency')}
                    onSideSelect={this.handleOptionChange('side')}
                    sideOptions={sideOptions}
                />
                <div className="bitto-one-click-trade__offers">
                    <OneClickOrderOption
                        onExecuteOrder={this.handleOrder}
                        side={side}
                        cryptoCurrency={cryptoCurrency}
                        cryptoCurrencyPrice="0.0339"
                        orderCurrency={currency}
                        orderCurrencySymbol={currencySymbols[currency]}
                        orderPrice="100.00"
                    />
                    <OneClickOrderOption
                        onExecuteOrder={this.handleOrder}
                        side={side}
                        cryptoCurrency={cryptoCurrency}
                        cryptoCurrencyPrice="0.0686"
                        orderCurrency={currency}
                        orderCurrencySymbol={currencySymbols[currency]}
                        orderPrice="250.00"
                        mostPopular={true}
                    />
                    <OneClickOrderOption
                        onExecuteOrder={this.handleOrder}
                        side={side}
                        cryptoCurrency={cryptoCurrency}
                        cryptoCurrencyPrice="0.1715"
                        orderCurrency={currency}
                        orderCurrencySymbol={currencySymbols[currency]}
                        orderPrice="500.00"
                    />
                    <OneClickOrderOption
                        onExecuteOrder={this.handleOrder}
                        side={side}
                        cryptoCurrency={cryptoCurrency}
                        cryptoCurrencyPrice="0.3435"
                        orderCurrency={currency}
                        orderCurrencySymbol={currencySymbols[currency]}
                        orderPrice="700.00"
                    />
                </div>
                <div className="bitto-one-click-trade__calculate-price">
                    <p>The price will be recalculated in <span className="bitto-highlighted">15</span> seconds.</p>
                    <a href="#">How is the price calculation?</a>
                </div>
                <OneClickCustomOrder
                    onRequestOrder={this.handleOrder}
                    cryptoCurrencies={cryptoCurrencyOptions.map(c => c.value)}
                    currencies={currencyOptions.map(c => c.value)}
                />
            </div>
        );
    }

    private handleOptionChange = (optionType: string) => (value: string) => {
        if (optionType in this.state) {
            this.setState({
                [optionType]: value,
            });
        }
    }

    private handleOrder = (order: OneClickOrder) => {
        return;
        // this.props.orderExecute(orderToExecute);
    }
}

const mapDispatchToProps = dispatch => ({
   orderExecute: (order: OrderExecute) => dispatch(orderExecute(order)),
});

const OneClickTradeScreenConnected = connect(null, mapDispatchToProps)(OneClickTrade);
const OneClickTradeScreen = Titled('One Click Trade')(OneClickTradeScreenConnected);

export {
    OneClickTradeScreen,
};
