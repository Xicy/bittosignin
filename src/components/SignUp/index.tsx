import { SignUpForm } from '@openware/components';
import {
    CoreError,
    selectUserError,
    selectUserLoading,
    selectUserLoggedIn,
} from '@openware/core-data';
import cx from 'classnames';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { RouterProps, withRouter } from 'react-router';
import bittoLogo = require('../../assets/icons/auth-logo.svg');
import { RootState } from '../../modules';

interface ReduxProps {
    isLoggedIn: boolean;
    error?: CoreError;
    loading?: boolean;
}

type Props = ReduxProps & RouterProps;

class SignUpComponent extends React.Component<Props> {
    public componentWillReceiveProps(props: Props) {
        if (props.isLoggedIn) {
            this.props.history.push('/wallets');
        }
    }

    public render() {
        const { loading, error } = this.props;

        const noOp = () => undefined;
        const className = cx('bitto-sign-up-screen__container', { loading });
        return (
            <div className="bitto-sign-up-screen">
                <div className={className}>
                    <div className="bitto-sign-up-screen__logo-container">
                        <img className="bitto-sign-up-screen__logo" src={bittoLogo} alt="Bitto" aria-hidden={true} />
                        <p className="bitto-sign-up-screen__title">Start Trading Today!</p>
                    </div>
                    <SignUpForm
                        errorMessage={error && error.message}
                        isLoading={loading}
                        onSignIn={this.handleSignIn}
                        onSignUp={noOp}
                    />
                </div>
            </div>
        );
    }

    private handleSignIn = () => {
        this.props.history.push('/dashboard/signin');
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    isLoggedIn: selectUserLoggedIn(state),
    loading: selectUserLoading(state),
    error: selectUserError(state),
});

// tslint:disable-next-line
const SignUp = withRouter(connect(mapStateToProps)(SignUpComponent) as any);

export {
    SignUp,
};
