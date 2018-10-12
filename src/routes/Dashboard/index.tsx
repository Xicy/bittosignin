import {
    CoreState,
    selectUser,
    userInfo,
} from '@openware/core-data';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Redirect, Route } from 'react-router';
import {
    HomeScreen,
    OneClickTradeScreen,
    ProfileScreen,
    ReferralProgramScreen,
    SignInScreen,
    SignUpScreen,
} from '../../screens';

interface ReduxProps {
    user: CoreState['user'];
}

interface DispatchProps {
    userInfo: (token: string) => void;
}

type Props = ReduxProps & DispatchProps;

// tslint:disable-next-line
const PrivateRoute: React.SFC<any> = ({ component: CustomComponent, isLogged, ...rest }) => {
    const renderRoute = props => (isLogged ? <CustomComponent {...props} /> : <Redirect to={'/dashboard/signin'} />);
    return (
        <Route
            render={renderRoute}
            {...rest}
        />
    );
};

class DashboardComponent extends React.PureComponent<Props> {
    public componentDidMount() {
        const token = localStorage.getItem('id_token');
        if (token) {
            this.props.userInfo(token);
        }
    }

    public render() {
        const isLogged = !!localStorage.getItem('id_token');
        return [
            <Route key="/dashboard/home" path="/dashboard/home" component={HomeScreen} />,
            <Route key="/dashboard/signin" path="/dashboard/signin" component={SignInScreen} />,
            <Route key="/dashboard/signup" path="/dashboard/signup" component={SignUpScreen} />,
            (
                <PrivateRoute
                    key="/dashboard/account/profile"
                    path="/dashboard/account/profile"
                    component={ProfileScreen}
                    isLogged={isLogged}
                />
            ),
            (
                <PrivateRoute
                    key="/dashboard/referral-program"
                    path="/dashboard/referral-program"
                    component={ReferralProgramScreen}
                    isLogged={isLogged}
                />
            ),
            (
                <PrivateRoute
                    key="/dashboard/one-click-trade"
                    path="/dashboard/one-click-trade"
                    component={OneClickTradeScreen}
                    isLogged={isLogged}
                />
            ),
        ];
    }
}

const mapStateToProps = state => ({
   user: selectUser(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    userInfo: (token: string) => dispatch(userInfo(token)),
});

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

export {
    Dashboard,
};
