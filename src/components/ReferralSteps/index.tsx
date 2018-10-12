import * as React from 'react';
import beRewardedIcon = require('../../assets/icons/be-rewarded.svg');
import getALinkIcon = require('../../assets/icons/get-a-link.svg');
import inviteUsersIcon = require('../../assets/icons/invite-users.svg');
import stepArrow = require('../../assets/icons/referral-step-arrow.svg');
import { Panel, ReferralStepsItem } from '../../atoms';

const ReferralSteps: React.SFC = () => (
    <div className="pg-referral-steps">
        <Panel title="Referral Steps">
            <ReferralStepsItem
                description="Share your personal referral link across the web."
                icon={getALinkIcon}
                title="1. Get a link"
            />
            <img className="pg-referral-steps__arrow" src={stepArrow} aria-hidden={true} />
            <ReferralStepsItem
                description="The more users you bring to Bitto, the more you get."
                icon={inviteUsersIcon}
                title="2. Invite Users"
            />
            <img className="pg-referral-steps__arrow" src={stepArrow} aria-hidden={true} />
            <ReferralStepsItem
                description="Get 25% of fee from all  exchange transactions of"
                icon={beRewardedIcon}
                title="3. Be Rewarded"
            />
        </Panel>
    </div>
);

export {
    ReferralSteps,
};
