import { Loader, Markets } from '@openware/components';
import {
    CurrentMarket,
    markets,
    selectCurrentMarket,
    selectMarkets,
    selectMarketsLoading,
    selectMarketTickers,
    selectUser,
    setCurrentMarket,
} from '@openware/core-data';
import classnames from 'classnames';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../../modules';

interface ReduxProps {
    userData: RootState['coreData']['user'];
    marketsData: CurrentMarket[];
    marketsLoading: boolean;
    marketTickers: {
        [key: string]: {
            last: string | number;
        },
    };
    currentMarket: {
        id: string;
        name: string;
    };
}

interface DispatchProps {
    markets: typeof markets;
    setCurrentMarket: typeof setCurrentMarket;
}

interface MarketItem {
    name: string;
    id: string;
}

type Props = ReduxProps & DispatchProps;

class MarketsContainer extends React.Component<Props> {
    public componentDidMount() {
        this.props.markets();
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.userData.uid &&
            (nextProps.marketsData.length === 0) &&
            !nextProps.marketsLoading) {
            this.props.markets();
        }
    }

    public render() {
        const { marketsLoading } = this.props;
        const className = classnames('pg-markets', {
            'pg-markets--loading': marketsLoading,
        });
        return (
            <div className={className}>
                {marketsLoading ? <Loader /> : this.markets()}
            </div>
        );
    }

    private markets = () => (
        <Markets
            data={this.mapMarkets()}
            onSelect={this.handleOnSelect}
        />
    )

    private mapMarkets() {
        const { marketsData, marketTickers } = this.props;
        const defaultTicker = { last: 0 };

        return marketsData.map((market: CurrentMarket) =>
            ([market.name, (marketTickers[market.id] || defaultTicker).last]),
        );
    }

    private handleOnSelect = (index: number) => {
        const { marketsData, currentMarket } = this.props;
        const marketToSet = marketsData[index];

        if (currentMarket.id !== marketToSet.id) {
            this.props.setCurrentMarket(marketToSet);
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    userData: selectUser(state),
    marketsData: selectMarkets(state),
    marketsLoading: selectMarketsLoading(state),
    marketTickers: selectMarketTickers(state),
    currentMarket: selectCurrentMarket(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        markets: () => dispatch(markets()),
        setCurrentMarket: (market: MarketItem) => dispatch(setCurrentMarket(market)),
    });

export const MarketsComponent = connect(mapStateToProps, mapDispatchToProps)(MarketsContainer);
