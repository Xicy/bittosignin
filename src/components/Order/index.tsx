import { Loader, Order, OrderProps } from '@openware/components';
import {
    CoreError,
    CoreState,
    Fees,
    orderExecute,
    selectCurrentMarket,
    selectExecuteError,
    selectExecuteLoading,
    selectMarketTickers,
    selectOrders,
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
    orders: CoreState['orders'];
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
        const { executeError, executeLoading, marketTickers, orders } = this.props;
        const currentMarketId = this.props.currentMarket.id;

        const from = currentMarketId.slice(0, 3);
        const to = currentMarketId.slice(-3);

        const currentTicker = marketTickers[currentMarketId];
        const defaultCurrentTicker = { last: '0' };

        const fees = this.getTradingFees(orders.fees);

        return (
            <div className={'pg-order'}>
                <div className="cr-table-header__content">
                    <div className="cr-title-component">Insert New Order</div>
                </div>
                <Order
                    disabled={!currentTicker || executeLoading}
                    feeBuy={Number(fees.bid.value)}
                    feeSell={Number(fees.ask.value)}
                    from={from}
                    onSubmit={this.handleSubmit}
                    priceMarketBuy={Number((currentTicker || defaultCurrentTicker).last)}
                    priceMarketSell={Number((currentTicker || defaultCurrentTicker).last)}
                    to={to}
                />
                {executeLoading && <Loader />}
                {executeError && <span className="pg-order__error">{executeError.message}</span>}
            </div>
        );
    }

    private handleSubmit = (value: OrderProps) => {
        const { type, price, orderType, amount } = value;
        const resultData = {
            market: this.props.currentMarket.id,
            side: type,
            volume: amount.toString(),
            ord_type: (orderType as string).toLowerCase(),
        };

        const order = orderType === 'Limit'
            ? { ...resultData, price: price.toString() }
            : resultData;

        this.props.orderExecute(order);
    }

    private getTradingFees = (fees: Fees[]) => {
        const emptyFees = {
            ask: {
                value: 0,
            },
            bid: {
                value: 0,
            },
        };

        const { currentMarket } = this.props;
        const foundFee = fees.find((fee: Fees) => !!fee[currentMarket.id]) || {};
        return fees && fees.length > 0 ? foundFee[currentMarket.id] : emptyFees;
    }
}

const mapStateToProps = (state: RootState) => ({
    currentMarket: selectCurrentMarket(state),
    executeError: selectExecuteError(state),
    executeLoading: selectExecuteLoading(state),
    marketTickers: selectMarketTickers(state),
    orders: selectOrders(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    orderExecute: (payload: OrderExecute) => dispatch(orderExecute(payload)),
});

const OrderComponent = connect(mapStateToProps, mapDispatchToProps)(OrderInsert);

export {
    OrderComponent,
    OrderExecute,
};
