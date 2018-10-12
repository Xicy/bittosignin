import { Button } from '@openware/components';
import cn from 'classnames';
import * as React from 'react';
import { Panel } from '../../atoms';
import { OneClickOrder } from '../OneClickCustomOrder';

interface OneClickOrderOptionProps {
    cryptoCurrencyPrice: string | number;
    cryptoCurrency: string;
    orderPrice: string | number;
    orderCurrency: string;
    orderCurrencySymbol: string;
    side: string;
    onExecuteOrder: (order: OneClickOrder) => void;
    mostPopular?: boolean;
}

class OneClickOrderOption extends React.PureComponent<OneClickOrderOptionProps> {
    public render() {
        const {
            cryptoCurrency,
            cryptoCurrencyPrice,
            side,
            orderPrice,
            orderCurrencySymbol,
            mostPopular,
        } = this.props;

        const className = cn('bitto-one-click-order-option', {
            'bitto-one-click-order-option--most-popular': mostPopular,
        });

        return (
            <div className={className}>
                {mostPopular && <p className="bitto-one-click-order-option__most-popular">Most Popular</p>}
                <Panel>
                    <p className="bitto-one-click-order-option__title">Get</p>
                    <p className="bitto-one-click-order-option__offer">{`${cryptoCurrencyPrice} ${cryptoCurrency}`}</p>
                    <p className="bitto-one-click-order-option__title">for</p>
                    <p className="bitto-one-click-order-option__price">{`${orderCurrencySymbol} ${orderPrice}`}</p>
                    <Button label={`${side} now`} onClick={this.handleOrder}/>
                </Panel>
            </div>
        );
    }

    public handleOrder = () => {
        return;
    }
}

export {
    OneClickOrderOption,
};
