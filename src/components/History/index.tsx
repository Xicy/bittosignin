import { History, Loader } from '@openware/components';
import {
    CurrentMarket,
    Order,
    selectCurrentMarket,
    selectOrdersCancelled,
    selectOrdersDone,
    selectOrdersLoading,
} from '@openware/core-data';
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';

interface ReduxProps {
    historyOrdersDone: Order[];
    historyOrdersCancelled: Order[];
    ordersLoading: boolean;
    currentMarket: CurrentMarket;
}

type Props = ReduxProps;

class HistoryContainer extends React.Component<Props> {
    public render() {
        const { ordersLoading } = this.props;
        const data = this.getHistoryData();
        const classNames = classnames('pg-history', {
            'pg-history--empty': !data.length,
            'pg-history--loading': ordersLoading,
        });
        return (
            <div className={classNames}>
                {ordersLoading ? <Loader /> : this.history()}
            </div>
        );
    }

    private history = () => <History data={this.renderData()} />;

    private getHistoryData() {
        const { historyOrdersDone, historyOrdersCancelled } = this.props;

        return this.sortDataByDateTime(historyOrdersCancelled.concat(historyOrdersDone));
    }

    private sortDataByDateTime(data: Order[]) {
        const sortByDateTime = (a: Order, b: Order) => a.created_at < b.created_at ? 1 : -1;
        const dataToSort = [...data];

        dataToSort.sort(sortByDateTime);
        return dataToSort;
    }

    private static getDate(time: string) {
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
    }

    private convertTotal(total: number, fractionDigit = 0) {
        return +Number(total).toFixed(fractionDigit);
    }

    private renderData() {
        const data = this.getHistoryData();
        return (data.length > 0) ? data.map(item => {
            const { price, created_at, volume, side } = item;
            const resultSide = side === 'sell' ? 'ask' : 'bid';
            return [
                HistoryContainer.getDate(created_at),
                resultSide,
                price,
                volume,
                this.convertTotal(volume * price),
            ];
        }) : [['There is no data to show...']];
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    historyOrdersDone: selectOrdersDone(state),
    historyOrdersCancelled: selectOrdersCancelled(state),
    ordersLoading: selectOrdersLoading(state),
    currentMarket: selectCurrentMarket(state),
});

export const HistoryComponent = connect(mapStateToProps)(HistoryContainer);
