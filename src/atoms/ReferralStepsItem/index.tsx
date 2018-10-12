import * as React from 'react';

interface ReferralStepsItemProps {
    description: string;
    icon: string;
    title: string;
}

const ReferralStepsItem: React.SFC<ReferralStepsItemProps> = props => (
    <div className="pg-referral-steps-item">
        <div className="pg-referral-steps-item__wrapper">
            <img aria-hidden={true} className="pg-referral-steps-item__icon" src={props.icon} />
            <p className="pg-referral-steps-item__title">{props.title}</p>
        </div>
        <p className="pg-referral-steps-item__description">{props.description}</p>
    </div>
);

export {
    ReferralStepsItem,
    ReferralStepsItemProps,
};
