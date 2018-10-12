import { Loader, Order, OrderProps } from '@openware/components';
import {
    CoreError,
    orderExecute,
    selectCurrentMarket,
    selectExecuteError,
    selectExecuteLoading,
    selectMarketTickers,
} from '@openware/core-data';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../../modules';

interface ReduxProps {
    currentMarket: {
        id: string;
        name: string;
    };
    executeLoading: boolean | undefined;
    marketTickers: {
        [key: string]: {
            last: number;
        },
    };
    executeError?: CoreError;
}

interface DispatchProps {
    orderExecute: typeof orderExecute;
}

interface OrderExecute {
    market: string;
    side: 'sell' | 'buy';
    volume: string;
    price?: string | undefined;
    ord_type?: string | undefined;
}

type Props = ReduxProps & DispatchProps;

class OrderInsert extends React.Component<Props> {
    public render() {
        const { executeError, executeLoading, marketTickers } = this.props;
        const currentMarketId = this.props.currentMarket.id;

        const from = currentMarketId.slice(0, 3);
        const to = currentMarketId.slice(-3);

        const currentTicker = marketTickers[currentMarketId];
        const defaultCurrentTicker = { last: '0' };

        return (
            <div className={'pg-order'}>
                <div className="cr-table-header__content">
                    <div className="cr-title-component">Insert New Order</div>
                </div>
                <Order
                    disabled={!currentTicker || executeLoading}
                    feeBuy={0.3}
                    feeSell={0.4}
                    from={from}
                    onSubmit={this.handleSubmit}
                    priceLimitBuy={Number((currentTicker || defaultCurrentTicker).last)}
                    priceLimitSell={Number((currentTicker || defaultCurrentTicker).last)}
                    to={to}
                />
                {executeLoading && <Loader />}
                {executeError && <span className="pg-order__error">{executeError.message}</span>}
            </div>
        );
    }

    private handleSubmit = (value: OrderProps) => {
        const { type, price, orderType, amount } = value;
        const order: OrderExecute = {
            market: this.props.currentMarket.id,
            side: type,
            volume: amount.toString(),
            price: price.toString(),
            ord_type: (orderType as string).toLowerCase(),
        };
        this.props.orderExecute(order);
    }
}

const mapStateToProps = (state: RootState) => ({
    currentMarket: selectCurrentMarket(state),
    executeError: selectExecuteError(state),
    executeLoading: selectExecuteLoading(state),
    marketTickers: selectMarketTickers(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    orderExecute: (payload: OrderExecute) => dispatch(orderExecute(payload)),
});

const OrderComponent = connect(mapStateToProps, mapDispatchToProps)(OrderInsert);

export {
    OrderComponent,
    OrderExecute,
};
