import * as React from 'react';

type CellData = string | number;

interface TableProps {
    headers: string[];
    data: CellData[][];
    entity?: string;
}

const renderBodyPlaceholder = entity => (
    <span className="pg-table__empty">{`You have no ${entity || 'data'}`}</span>
);

class Table extends React.PureComponent<TableProps> {
    public render() {
        const { data, entity, headers } = this.props;
        return (
            <div className="pg-table-wrapper">
                <table className="pg-table" cellSpacing={0}>
                    <thead className="pg-table__head">
                        <tr>{this.renderHead(headers)}</tr>
                    </thead>
                    {data.length > 0 && this.renderBody(data)}
                </table>
                {data.length === 0 && renderBodyPlaceholder(entity)}
            </div>
        );
    }

    private renderHead(headers: string[]) {
        return headers.map((header: string, index: number) => (
            <th key={index}>{header}</th>
        ));
    }

    private renderBody = (data: CellData[][]) => {
        return (
            <tbody>
                {data.map(this.renderRow)}
            </tbody>
        );
    }

    private renderRow = (row: CellData[], index: number) => {
        return <tr key={index}>{row.map(this.renderCell)}</tr>;
    }

    private renderCell(cell: CellData, index: number) {
        return <td key={index}>{cell}</td>;
    }
}

export {
    CellData,
    Table,
    TableProps,
};
