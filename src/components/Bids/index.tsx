import { Loader, OrderBook } from '@openware/components';
import {
    CoreError,
    selectOrderBookBids,
    selectOrderBookError,
    selectOrderBookLoading,
} from '@openware/core-data';
import classNames from 'classnames';
import * as React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import {RootState} from '../../modules';

interface ReduxProps {
    // tslint:disable
    bidsItems: any[];
    bidsLoading: boolean;
    bidsError?: CoreError;
}

type Props = ReduxProps;

class OrderBookContainer extends React.Component<Props> {
    public render() {
        const { bidsError, bidsItems, bidsLoading } = this.props;
        const cn = classNames('', {
            'pg-bids--loading': bidsLoading,
        });
        return (
            <div className={cn}>
                {bidsError && <span>{bidsError.message}</span>}
                {bidsLoading ? <Loader /> :
                    <OrderBook
                        title={'Bids'}
                        side={'right'}
                        headers={['Price', 'Amount']}
                        data={this.renderData(bidsItems)}
                    />
                }
            </div>
        );
    }

    private renderData(data: any[]) {
        return (data.length > 0) ? data.map((item: any) => {
            const [ price, volume ] = item;
            return [price, volume];
        }) : [['There is no data to show...']];
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    bidsItems: selectOrderBookBids(state),
    bidsLoading: selectOrderBookLoading(state),
    bidsError: selectOrderBookError(state),
});

const Bids = connect(mapStateToProps)(OrderBookContainer);

export {
    Bids,
};
