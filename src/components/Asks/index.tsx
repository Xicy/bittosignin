import { Loader, OrderBook } from '@openware/components';
import {
    CoreError,
    orderBook,
    selectCurrentMarket,
    selectOrderBookAsks,
    selectOrderBookError,
    selectOrderBookLoading,
} from '@openware/core-data';
import classNames from 'classnames';
import * as React from 'react';
import {
    connect,
    MapStateToProps,
} from 'react-redux';
import { RootState } from '../../modules';

interface ReduxProps {
    asksItems: RootState['coreData']['orderBook']['asks'];
    askItemsLoading: boolean;
    askItemsError?: CoreError;
    currentMarket: {
        id: string;
        name: string;
    };
}

interface DispatchProps {
    orderBook: (market: string) => void;
}

type Props = ReduxProps & DispatchProps;

class OrderBookContainer extends React.Component<Props> {
    public componentDidMount() {
        this.props.orderBook(this.props.currentMarket.id);
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.currentMarket !== nextProps.currentMarket) {
            this.props.orderBook(nextProps.currentMarket.id);
        }
    }

    private static renderData(asks: ReduxProps['asksItems']) {
        return (asks.length > 0) ? asks.map(item => {
            const [ price, volume ] = item;
            return [ price, volume ];
        }) : [['There is no data to show...']];
    }

    public render() {
        const { askItemsError, asksItems, askItemsLoading } = this.props;
        const cn = classNames('pg-asks', {
            'pg-asks--loading': askItemsLoading,
        });
        return (
            <div className={cn}>
                {askItemsError && <span>{askItemsError.message}</span>}
                {askItemsLoading ? <Loader /> : this.orderBook(asksItems)}
            </div>
        );
    }

    private orderBook = items => (
        <OrderBook
            title={'Asks'}
            headers={['Price', 'Volume']}
            data={OrderBookContainer.renderData(items)}
        />
    );
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    asksItems: selectOrderBookAsks(state),
    askItemsLoading: selectOrderBookLoading(state),
    askItemsError: selectOrderBookError(state),
    currentMarket: selectCurrentMarket(state),
});

const mapDispatchToProps = dispatch => ({
    orderBook: (market: string) => dispatch(orderBook(market)),
});

const Asks = connect(mapStateToProps, mapDispatchToProps)(OrderBookContainer);

export {
    Asks,
};
