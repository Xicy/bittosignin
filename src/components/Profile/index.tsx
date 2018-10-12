/* tslint:disable jsx-no-lambda */
// import { Button } from '@openware/components';
import { Avatar } from '@openware/components';
import * as React from 'react';

// interface ProfileProps {
//     password
// }

class Profile extends React.Component {
    public render() {
        return(
            <div className={'pg-container pg-profile-page'}>
                <div id={'left-col'}>
                    <div id={'basic'} className={'pg-profile-page__box'}>
                        <div id={'info-row'} className={'pg-profile-page__box-header'}>
                            <Avatar title={'Av'}/>
                            <div id={'block'}>
                                <div className={'row'}>
                                    <h3>email@email.com</h3>
                                </div>
                                <div className={'row'}>
                                    <p className={'text-muted'}>Last login time 2018-06-07 12:45:12</p>
                                    <p className={'text-muted'}>IP 127.0.0.1</p>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <label>Password</label>
                            <span>******</span>
                            <span onClick={() => alert('Change password')}>Change</span>
                        </div>
                    </div>
                    <div id={'verification'} className={'pg-profile-page__box'}>
                        <h3>Profile Verification</h3>
                    </div>
                </div>
                <div id={'right-col'}>
                    <div id={'referral-program'} className={'pg-profile-page__box'}>
                        <h3>Referral Program</h3>
                    </div>
                </div>
                {/*<div id={'activity'} className={'pg-profile-page__box'}>*/}
                    {/*<h3>Account activity</h3>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export {
    Profile,
};
