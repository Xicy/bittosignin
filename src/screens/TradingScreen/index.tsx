import { Grid } from '@openware/components';
import {
    accountWallets,
    pusherConnect,
    userInfo,
} from '@openware/core-data';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
    Asks,
    Bids,
    HistoryComponent,
    MarketsComponent,
    News,
    OpenOrdersComponent,
    OrderComponent,
    TradingChart,
} from '../../components';
import { Titled } from '../../decorators';
import { PUSHER_KEY } from '../../index';

const breakpoints = {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
};

const cols = {
    lg: 24,
    md: 24,
    sm: 12,
    xs: 12,
    xxs: 12,
};

const lgLayout = [
    { x: 0, y: 0, w: 5, h: 12, i: '0', minH: 12, minW: 4 },
    { x: 0, y: 10, w: 5, h: 20, i: '1', minH: 18, minW: 4 },
    { x: 9, y: 14, w: 15, h: 32, i: '2', minH: 12, minW: 5 },
    { x: 5, y: 0, w: 4, h: 23, i: '3', minH: 10, minW: 3 },
    { x: 5, y: 0, w: 4, h: 23, i: '4', minH: 10, minW: 3 },
    { x: 9, y: 0, w: 11, h: 14, i: '5', minH: 10, minW: 4 },
    { x: 0, y: 12, w: 5, h: 14, i: '6', minH: 10, minW: 5 },
    { x: 20, y: 0, w: 4, h: 14, i: '7', minH: 10, minW: 4 },
];

const smGridItem = {
    isDraggable: false,
    isResizable: true,
    x: 0,
    w: 12,
};

const smLayout = [
    { y: 0, h: 15, i: '0', minH: 15, minW: 4, ...smGridItem },
    { y: 15, h: 24, i: '1', minH: 24, minW: 5, ...smGridItem },
    { y: 39, h: 30, i: '2', minH: 30, minW: 5, ...smGridItem },
    { y: 69, h: 12, i: '3', minH: 12, minW: 3, ...smGridItem },
    { y: 81, h: 12, i: '4', minH: 12, minW: 3, ...smGridItem },
    { y: 93, h: 12, i: '5', minH: 12, minW: 5, ...smGridItem },
    { y: 105, h: 12, i: '6', minH: 12, minW: 5, ...smGridItem },
    { y: 117, h: 12, i: '7', minH: 12, minW: 5, ...smGridItem },
];

const layouts = {
    lg: lgLayout,
    md: lgLayout,
    sm: smLayout,
};

const gridItems = [
    {
        i: 0,
        render: () => <MarketsComponent />,
    },
    {
        i: 1,
        render: () => <OrderComponent />,
    },
    {
        i: 2,
        render: () => <TradingChart />,
    },
    {
        i: 3,
        render: () => <Bids />,
    },
    {
        i: 4,
        render: () => <Asks />,
    },
    {
        i: 5,
        render: () => <HistoryComponent />,
    },
    {
        i: 6,
        render: () => <OpenOrdersComponent />,
    },
    {
        i: 7,
        render: () => <News />,
    },
];

const handleLayoutChange = () => {
    return;
};

interface DispatchProps {
    userInfo: typeof userInfo;
    pusherConnect: typeof pusherConnect;
    accountWallets: typeof accountWallets;
}

type Props = DispatchProps;

const root = document.querySelector('html');

class Trading extends React.Component<Props> {
    public componentDidMount() {
        if (root) {
            root.style.setProperty('--background', '#2c353f');
        }

        const token = localStorage.getItem('id_token');
        this.props.userInfo(token as string);

        this.props.pusherConnect(PUSHER_KEY);
        this.props.accountWallets();
    }

    public componentWillUnmount() {
        if (root) {
            root.style.setProperty('--background', '#f3f2f2');
        }
    }

    public render() {
        const rowHeight = 12;
        return (
            <div className={'pg-trading-screen'}>
                <div className={'pg-trading-wrap'}>
                    <Grid
                        breakpoints={breakpoints}
                        className="layout"
                        children={gridItems}
                        cols={cols}
                        draggableHandle=".cr-table-header__content"
                        layouts={layouts}
                        rowHeight={rowHeight}
                        onLayoutChange={handleLayoutChange}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    userInfo: (token: string) => dispatch(userInfo(token)),
    pusherConnect: (appKey: string) => dispatch(pusherConnect(appKey)),
    accountWallets: () => dispatch(accountWallets()),
});

const TitledTradingScreen = Titled<Props>('Advanced Trading')(Trading);

const TradingScreen = connect(null, mapDispatchToProps)(TitledTradingScreen);

export {
    TradingScreen,
};
