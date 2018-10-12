import { CopyableTextField, QRCode } from '@openware/components';
import * as React from 'react';
import { Details, Panel, ShareButton } from '../../atoms';

interface ReferralStatusProps {
    referralId: string | number;
    commissionRate: string;
    referralCode: string;
    referralLink: string;
    referralFriends: number;
    commissionValue: string;
}

class ReferralStatus extends React.PureComponent<ReferralStatusProps> {
    public render() {
        const {
            commissionRate,
            commissionValue,
            referralFriends,
            referralId,
            referralCode,
            referralLink,
        } = this.props;
        return (
            <div className="pg-referral-status ">
                <Panel title="Referral Status">
                    <Details title="My Referral ID">{referralId}</Details>
                    <Details title="Commision Rate">
                        <span className="pg-details__content--highlighted">{commissionRate}</span>
                    </Details>
                    <QRCode data={referralLink} dimensions="md" />
                    <Details title="Referral Link">
                        {referralCode ? <CopyableTextField value={referralLink} /> : null}
                    </Details>
                    <Details title="Share">
                        <ShareButton url={referralLink} socialMedia="facebook" />
                        <ShareButton url={referralLink} socialMedia="twitter" />
                        <ShareButton url={referralLink} socialMedia="linkedin" />
                        <ShareButton url={referralLink} socialMedia="googleplus" />
                    </Details>
                    <Details title="Referral Friends">
                        <span className="pg-details__content--highlighted">{referralFriends}</span>
                    </Details>
                    <Details title="Estimated Comission Value">
                        <span className="pg-details__content--highlighted">{commissionValue}</span>
                    </Details>
                </Panel>
            </div>
        );
    }
}

export {
    ReferralStatus,
};
