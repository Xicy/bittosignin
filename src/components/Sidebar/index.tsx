import cn from 'classnames';
import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { SidebarItem } from '../../atoms';
import { toggleSidebar } from '../../modules';
import { getRoutes } from './links';

interface SidebarProps {
    isUserLoggedIn: boolean;
    location: Location;
    visible: boolean;
    toggleSidebar: () => void;
}

class SidebarComponent extends React.PureComponent<SidebarProps> {
    public render() {
        const { isUserLoggedIn, location } = this.props;
        const { pathname } = location;
        if (!isUserLoggedIn || pathname === '/trading' || pathname === '/dashboard/home') {
            return null;
        }
        const { visible } = this.props;
        const className = cn('bitto-sidebar', {
            'bitto-sidebar--open': visible,
        });
        return (
            <div className={className}>
                {this.renderSidebarItems()}
            </div>
        );
    }

    private renderSidebarItems = () => (
        getRoutes().map((route, index) => (
            <SidebarItem
                active={this.isRouteActive(route.url)}
                key={index}
                onClick={this.handleRouteChange}
                {...route}
            />
        ))
    );

    private handleRouteChange = () => {
        this.props.toggleSidebar();
    }

    private isRouteActive = (url: string) => (
        this.props.location.pathname.includes(url) && url !== '/dashboard'
    );
}

const mapStateToProps = state => ({
    visible: state.ui.sidebarVisible,
});

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(toggleSidebar()),
});

// tslint:disable
const Sidebar = withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarComponent) as any) as any;

export {
  Sidebar,
};
