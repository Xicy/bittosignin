import { CoreState, selectUser } from '@openware/core-data';
import cn from 'classnames';
import { History } from 'history';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Dashboard } from '../';
import { RootState } from '../../modules';
import {
    TradingScreen,
} from '../../screens';

interface ReduxProps {
    user: CoreState['user'];
}

interface OwnProps {
    history: History;
}

type Props = ReduxProps & OwnProps;

class LayoutComponent extends React.Component<Props> {
    public render() {
        const { user } = this.props;
        const withSidebar = (user.email.length > 0) && location.pathname !== '/trading' && location.pathname !== '/dashboard/home';
        const className = cn('bitto-layout', {
           'bitto-layout--with-sidebar': withSidebar,
        });
        return (
            <div className={className}>
                <Switch>
                    <Route path="/trading" component={TradingScreen}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="**" render={this.renderRedirect}/>
                </Switch>
            </div>
        );
    }

    private renderRedirect = () => (
        <Redirect to={'/dashboard/signin'}/>
    )
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    user: selectUser(state),
});

// tslint:disable-next-line
const Layout = withRouter(connect(mapStateToProps)(LayoutComponent) as any) as any;

export {
    Layout,
};
