import { Grid } from '@openware/components';
import { CoreState, selectUser } from '@openware/core-data';
import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { ScreenTitle } from '../../atoms';
import {
    CommissionHistory,
    GenerateLink,
    ReferralFriends,
    ReferralStatus,
    ReferralSteps,
} from '../../components';
import { Titled } from '../../decorators';

const breakpoints = {
    lg: 1200,
    md: 768,
    sm: 480,
    xs: 320,
    xxs: 0,
};

const cols = {
    lg: 6,
    md: 6,
    sm: 6,
    xs: 6,
    xxs: 6,
};

const lgLayout = [
    { x: 0, y: 0, w: 2, h: 80, i: '0', minW: 2, maxW: 2, static: true },
    { x: 4, y: 0, w: 4, h: 36, i: '1', static: true },
    { x: 2, y: 36, w: 4, h: 44, i: '2', static: true },
    { x: 0, y: 80, w: 3, h: 74, i: '3', static: true },
    { x: 3, y: 80, w: 3, h: 74, i: '4', static: true },
];

const layouts = {
    lg: lgLayout,
    md: lgLayout,
    sm: [
        { x: 0, y: 0, w: 6, h: 98, i: '0', static: true },
        { x: 0, y: 98, w: 6, h: 46, i: '1', static: true },
        { x: 0, y: 144, w: 6, h: 101, i: '2', static: true },
        { x: 0, y: 245, w: 6, h: 78, i: '3', static: true },
        { x: 0, y: 324, w: 6, h: 80, i: '4', static: true },
    ],
};

interface ReduxProps {
    user: CoreState['user'];
}

interface State {
    uid: string;
    referral_code: string;
    referral_link: string;
    affiliates: string[];
}

const handleLayoutChange = () => { return; };

class ReferralProgram extends React.Component<ReduxProps, State> {
    public state = {
        uid: '',
        referral_code: '',
        referral_link: '',
        affiliates: [],
    };

    private title = 'Referral Program';
    private subtitle = 'Invite users to Bitto and earn 25% of the fee on their exchange transactions!';

    public componentWillReceiveProps(nextProps: ReduxProps) {
        const uid = this.props.user.uid;
        const nextUID = nextProps.user.uid;
        if (
            uid.length === 0 &&
            uid !== nextUID &&
            !!nextUID
        ) {
            axios.get(`https://applogic.uat.bittoexchange.com/api/v1/users/${nextUID}`)
                .then(res => {
                    this.setState({
                        uid: res.data.uid,
                        referral_code: res.data.referral_code,
                        referral_link: `https://www.uat.bittoexchange.com/?referral_code=${res.data.referral_code}`,
                        affiliates: res.data.affiliates,
                    });
                })
                // tslint:disable-next-line:no-console
                .catch(error => console.log(error.message));
        }
    }

    public render() {
        const rowHeight = 1;
        return (
            <div className="pg-referral-program">
                <ScreenTitle title={this.title} subtitle={this.subtitle} />
                <Grid
                    breakpoints={breakpoints}
                    children={this.getGridItems()}
                    cols={cols}
                    layouts={layouts}
                    rowHeight={rowHeight}
                    onLayoutChange={handleLayoutChange}
                />
            </div>
        );
    }

    public handleGenerateLink() {
        if (this.state.referral_code) {
            return;
        }
        axios.post(`https://applogic.uat.bittoexchange.com/api/v1/users/${this.props.user.uid}`)
        .then(res => {
            this.setState({
                uid: res.data.uid,
                referral_code: res.data.referral_code,
                referral_link: `https://www.uat.bittoexchange.com/?ref=${res.data.referral_code}`,
            });
        })
        // tslint:disable-next-line:no-console
        .catch(error => console.log(error));
    }

    private handeDataExport() {
        return;
    }

    private getGridItems = () => {
        return [
            {
                i: 0,
                render: () => (
                    <ReferralStatus
                        commissionRate="20%"
                        commissionValue="0.0243 BTC"
                        referralFriends={this.getReferredFriends().length}
                        referralId={this.state.uid}
                        referralCode={this.state.referral_code}
                        referralLink={this.state.referral_link}
                    />
                ),
            },
            {
                i: 1,
                render: () => (
                  <GenerateLink
                      referralCode={this.state.referral_code}
                      referralLink={this.state.referral_link}
                      // tslint:disable-next-line
                      onGenerateLink={this.handleGenerateLink.bind(this)}
                  />
                ),
            },
            {
                i: 2,
                render: () => <ReferralSteps />,
            },
            {
                i: 3,
                render: () => (
                    <ReferralFriends
                        data={this.getReferredFriends()}
                        onExport={this.handeDataExport}
                    />
                ),
            },
            {
                i: 4,
                render: () => (
                    <CommissionHistory
                        data={this.getCommissionHistory()}
                        onExport={this.handeDataExport}
                    />
                ),
            },
        ];
    }

    private getReferredFriends() {
        return this.state.affiliates.map(friend => ({
            email: friend[0],
            date: friend[1],
        }));
    }

    private getCommissionHistory() {
        return [
            { commission: '5%', email: 'friend1@example.com', date: 1538052977982 },
            { commission: '12%',email: 'friend2@example.com', date: 1538052977982 },
            { commission: '4%',email: 'friend3@example.com', date: 1538052977982 },
        ];
    }
}

const mapStateToProps = state => ({
  user: selectUser(state),
});

const TitledReferralProgramScreen = Titled<ReduxProps>('Referral Program')(ReferralProgram);

const ReferralProgramScreen = connect(mapStateToProps, null)(TitledReferralProgramScreen);


export {
    ReferralProgramScreen,
};
