import * as React from 'react';
import {
    CellData,
    ExportButton,
    Panel,
    Table,
} from '../../atoms';

interface ReferredFriend {
    email: string;
    date: string | number;
}

interface ReferralFriendsProps {
    onExport: () => void;
    data: ReferredFriend[];
}

class ReferralFriends extends React.Component<ReferralFriendsProps> {
    private headers = ['Email', 'Date'];

    public render() {
        return (
            <div className="pg-referral-friends">
                <Panel title="Referral Friends" renderAction={this.renderAction}>
                    <Table
                        entity="referral friends"
                        headers={this.headers}
                        data={this.getTableData()}
                    />
                </Panel>
            </div>
        );
    }

    private getTableData = () => {
        return this.props.data.map(
            friend => ([friend.email, this.renderDate(friend.date)]),
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
    ReferredFriend,
    ReferralFriends,
    ReferralFriendsProps,
};
