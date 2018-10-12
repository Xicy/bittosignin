import { Button } from '@openware/components';
import * as React from 'react';
import { CustomAmountOrderInput, Panel } from '../../atoms';

interface OneClickOrder {
    currencyAmount: string | number;
    cryptoCurrencyAmount: string | number;
    cryptoCurrency?: string;
    currency?: string;
}

interface OneClickCustomOrderProps {
    /**
     * List of available crypto currencies to buy/sell (btc, eth, etc)
     */
    cryptoCurrencies: string[];
    /**
     * List of available currencies to buy/sell with (usd, etc)
     */
    currencies: string[];
    onRequestOrder: (order: OneClickOrder) => void;
}

interface OneClickCustomOrderState {
    selectedCryptoCurrencyIndex: number;
    selectedCurrencyIndex: number;
    cryptoCurrencyAmount: string | number;
    currencyAmount: string | number;
}

class OneClickCustomOrder extends React.Component<OneClickCustomOrderProps, OneClickCustomOrderState> {
    public state = {
        selectedCryptoCurrencyIndex: 0,
        selectedCurrencyIndex: 0,
        cryptoCurrencyAmount: 0,
        currencyAmount: 0,
    };

    public render() {
        const { cryptoCurrencyAmount, currencyAmount } = this.state;
        const { cryptoCurrencies, currencies } = this.props;
        return (
            <div className="bitto-one-click-custom-order">
                <Panel>
                    <p className="bitto-one-click-custom-order__title">You can also input a custom amount:</p>
                    <CustomAmountOrderInput
                        currencies={cryptoCurrencies}
                        onCurrencyChange={this.handleCryptoCurrencyChange}
                        onAmountChange={this.handleCryptoCurrencyAmountChange}
                        amount={cryptoCurrencyAmount}
                    />
                    <CustomAmountOrderInput
                        currencies={currencies}
                        onCurrencyChange={this.handleCurrencyChange}
                        onAmountChange={this.handleCurrencyAmountChange}
                        amount={currencyAmount}
                    />
                    <Button label="Buy Now" onClick={this.handleOrder} />
                </Panel>
            </div>
        );
    }

    public handleCryptoCurrencyChange = (currencyIndex: number) => {
        this.setState({
            selectedCryptoCurrencyIndex: currencyIndex,
        });
    }

    public handleCryptoCurrencyAmountChange = (amount: string | number) => {
        this.setState({
            cryptoCurrencyAmount: amount,
        });
    }

    public handleCurrencyChange = (currencyIndex: number) => {
        this.setState({
            selectedCurrencyIndex: currencyIndex,
        });
    }

    public handleCurrencyAmountChange = (amount: string | number) => {
        this.setState({
            currencyAmount: amount,
        });
    }

    private handleOrder = () => {
        const {
            selectedCryptoCurrencyIndex,
            selectedCurrencyIndex,
            cryptoCurrencyAmount,
            currencyAmount,
        } = this.state;

        const cryptoCurrency = this.props.cryptoCurrencies.find(
            (c, index) => index === selectedCryptoCurrencyIndex,
        );

        const currency = this.props.currencies.find(
            (c, index) => index === selectedCurrencyIndex,
        );

        if (cryptoCurrency && currency) {
            const order: OneClickOrder = {
                cryptoCurrency,
                currency,
                currencyAmount,
                cryptoCurrencyAmount,
            };

            this.props.onRequestOrder(order);
        }
    }
}

export {
    OneClickCustomOrder,
    OneClickOrder,
};
