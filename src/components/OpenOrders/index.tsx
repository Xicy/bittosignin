import { Loader, OpenOrders } from '@openware/components';
import {
    Order,
    orderCancel,
    orderHistory,
    selectCurrentMarket,
    selectOrdersLoading,
    selectOrdersOpen,
} from '@openware/core-data';
import classnames from 'classnames';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RootState } from '../../modules';

interface ReduxProps {
    currentMarket: {
        id: string;
        name: string;
    };
    openOrdersData: Order[];
    openOrdersLoading: boolean;
}

interface DispatchProps {
    orderHistory: typeof orderHistory;
    orderCancel: typeof orderCancel;
}

type Props = ReduxProps & DispatchProps;

class OpenOrdersContainer extends React.Component<Props> {
    public componentDidMount() {
        this.props.orderHistory(this.props.currentMarket.id);
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (this.props.currentMarket !== nextProps.currentMarket) {
            this.props.orderHistory(nextProps.currentMarket.id);
        }
    }

    public render() {
        const { openOrdersData, openOrdersLoading } = this.props;
        const classNames = classnames('pg-open-orders', {
            'pg-open-orders--empty': !openOrdersData.length,
            'pg-open-orders--loading': openOrdersLoading,
        });
        return (
            <div className={classNames}>
                {openOrdersLoading ? <Loader /> : this.openOrders()}
            </div>
        );
    }

    private openOrders = () => (
        <OpenOrders
            data={this.renderData(this.props.openOrdersData)}
            onCancel={this.handleCancel}
        />
    );

    private static getDate = (time: string) => {
        const convertTimeUnit = (timeUnit: number) =>
            timeUnit > 9 ? timeUnit : `0${timeUnit}`;

        const date = new Date(time);
        const day = date.getDay();
        const month = date.getMonth();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const convertedDay = convertTimeUnit(day);
        const convertedMonth = convertTimeUnit(month);
        const convertedHours = convertTimeUnit(hours);
        const convertedMinutes = convertTimeUnit(minutes);

        return `${convertedDay} / ${convertedMonth} ${convertedHours}:${convertedMinutes}`;
    };

    private renderData = (data: Order[]) => {
        const renderRow = item => {
            const { price, created_at, volume } = item;
            return [OpenOrdersContainer.getDate(created_at), price, volume, ''];
        };

        return (data.length > 0)
            ? this.sortDataByDateTime(data).map(renderRow)
            : [['There is no data to show...']];
    };

    private sortDataByDateTime(data: Order[]) {
        const sortByDateTime = (a: Order, b: Order) => a.created_at < b.created_at ? 1 : -1;
        const dataToSort = [...data];

        dataToSort.sort(sortByDateTime);
        return dataToSort;
    }

    private handleCancel = (index: number) => {
        const { openOrdersData } = this.props;
        const orderToDelete = openOrdersData[index];
        this.props.orderCancel(orderToDelete.id);
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    openOrdersData: selectOrdersOpen(state),
    openOrdersLoading: selectOrdersLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        orderHistory: market => dispatch(orderHistory(market)),
        orderCancel: (id: string) => dispatch(orderCancel(id)),
    });

export const OpenOrdersComponent =
    connect(mapStateToProps, mapDispatchToProps)(OpenOrdersContainer);
