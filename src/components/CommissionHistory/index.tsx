import * as React from 'react';
import {
    CellData,
    ExportButton,
    Panel,
    Table,
} from '../../atoms';

interface Commission {
    commission: string | number;
    date: string | number;
    email: string;
}

interface CommissionHistoryProps {
    onExport: () => void;
    data: Commission[];
}

class CommissionHistory extends React.Component<CommissionHistoryProps> {
    private headers = ['Commission', 'Email', 'Date'];

    public render() {
        return (
            <div className="pg-commission-history">
                <Panel title="Latest Commission History" renderAction={this.renderAction}>
                    <Table
                        entity="commissions"
                        headers={this.headers}
                        data={this.getTableData()}
                    />
                </Panel>
            </div>
        );
    }

    private getTableData = () => {
        return this.props.data.map(
            commission => ([commission.commission, commission.email, this.renderDate(commission.date)]),
        );
    }

    private renderDate(time: CellData) {
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

        return `${convertedDay}-${convertedMonth} ${convertedHours}:${convertedMinutes}`;
    }

    private renderAction() {
        return <ExportButton url="#" />;
    }
}

export {
    Commission,
    CommissionHistory,
    CommissionHistoryProps,
};
