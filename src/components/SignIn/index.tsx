import { SignInForm, SignInFormValues } from '@openware/components';
import {
    CoreError,
    CoreState,
    selectUser,
    selectUserError,
    selectUserLoading,
    selectUserLoggedIn,
    userLogin,
} from '@openware/core-data';
import cx from 'classnames';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import bittoLogo = require('../../assets/icons/auth-logo.svg');
import { APPLICATION_ID } from '../../index';
import { RootState } from '../../modules';


interface ReduxProps {
    isLoggedIn: boolean;
    error?: CoreError;
    loading?: boolean;
    user: CoreState['user'];
}

interface DispatchProps {
    signIn: typeof userLogin;
}

type Props = ReduxProps & DispatchProps & RouterProps;

class SignInComponent extends React.Component<Props> {
    public componentWillReceiveProps(props: Props) {
        if (props.isLoggedIn) {
            const token = this.props.user.token;
            localStorage.setItem('id_token', token);
            this.props.history.push('/dashboard');
        }
    }

    public render() {
        const { loading, error } = this.props;

        const noOp = () => undefined;
        const className = cx('bitto-sign-in__container', { loading });
        return (
            <div className="bitto-sign-in">
                <div className={className}>
                    <div className="bitto-sign-up-screen__logo-container">
                        <img className="bitto-sign-up-screen__logo" src={bittoLogo} alt="Bitto" aria-hidden={true} />
                        <p className="bitto-sign-up-screen__title">Start Trading Today!</p>
                    </div>
                    <SignInForm
                        errorMessage={error && error.message}
                        isLoading={loading}
                        onForgotPassword={noOp}
                        onSignUp={this.handleSignUp}
                        onSignIn={this.handleSignIn}
                    />
                </div>
            </div>
        );
    }

    private handleSignIn = ({ email, password }: SignInFormValues) => {
        this.props.signIn({
            email,
            password,
            application_id: APPLICATION_ID,
        });
    };
    private handleSignUp = () => {
        this.props.history.push('/dashboard/signup');
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    isLoggedIn: selectUserLoggedIn(state),
    loading: selectUserLoading(state),
    error: selectUserError(state),
    user: selectUser(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        signIn: data => dispatch(userLogin(data)),
    });

// tslint:disable-next-line
const SignIn = withRouter(connect(mapStateToProps, mapDispatchProps)(SignInComponent) as any);

export {
    SignIn,
};
