import { Button } from '@openware/components';
import * as React from 'react';
import { Panel } from '../../atoms';

interface GenerateLinkProps {
    referralCode: string;
    referralLink: string;
    onGenerateLink: () => void;
}

const GenerateLink: React.SFC<GenerateLinkProps> = props => (
    <div className="pg-generate-link">
        <Panel>
            <p className="pg-generate-link__description">
                To start participating in affiliate program,
                generate your unique referral link.
            </p>
            <p className="pg-generate-link__description">
                Please note that by generating your referral
                link you accept and fulfil the below Terms and Conditions.
            </p>
            {props.referralCode ? <Button label="Link Generated" onClick={props.onGenerateLink} className="cr-button__disabled" /> : <Button label="Generate Link" onClick={props.onGenerateLink} />}
        </Panel>
    </div>
);

export {
    GenerateLink,
    GenerateLinkProps,
};
