import { CoreState, selectUser, userLogout } from '@openware/core-data';
import cn from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dashboardIcon = require('../../assets/icons/dashboard-alt.svg');
import logoutIcon = require('../../assets/icons/logout-alt.svg');
import ordersIcon = require('../../assets/icons/orders.svg');
import profileIcon = require('../../assets/icons/profile-alt.svg');
import sunIcon = require('../../assets/icons/sun.svg');
import walletsIcon = require('../../assets/icons/wallet.svg');
import { HeaderDropdown, HeaderHamburger, Logo, NavIconLink } from '../../atoms';
import { pgRoutes } from '../../constants';
import { toggleSidebar } from '../../modules';
import { clearLocalStorage } from '../../utils';
import { NavBar } from '../NavBar';

interface ReduxProps {
    user: CoreState['user'];
}

interface DispatchProps {
    logout: () => void;
    toggleSidebar: () => void;
}

type Props = ReduxProps & DispatchProps;

interface State {
    isActive: boolean;
}

class HeaderComponent extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
        };
    }

    public render() {
        const { user } = this.props;
        const { isActive } = this.state;
        const className = cn('pg-header', {
            'pg-header--active': isActive,
            'pg-header--active-public': isActive && !user.email,
        });
        return (
            <header className={className}>
                <div className="pg-header__content">
                    <div className="pg-header__navbar">
                        <img
                            className="pg-header__sidebar-toggler"
                            src={dashboardIcon}
                            alt="Toggle sidebar"
                            onClick={this.props.toggleSidebar}
                        />
                        <Link className="pg-header__logo" to="/dashboard/home">
                            <Logo />
                        </Link>
                        <NavBar onLinkChange={this.toggleModal} />
                    </div>
                    {user.email && user.email.length > 0 && this.renderPrivateNav()}
                    <div className="pg-header__togglers-wrapper">
                        <img
                            className="pg-header__theme-toggler pg-header__theme-toggler--mobile"
                            src={sunIcon}
                            alt="Toggle color theme"
                        />
                        <div
                            onClick={this.toggleModal}
                            className={`pg-header__toggler ${isActive ? 'pg-header__toggler--active' : ''}`}
                        >
                            <HeaderHamburger active={isActive} />
                        </div>
                    </div>
                </div>
                <div className={`pg-header__menu ${isActive ? 'pg-header__menu--open' : ''}`}>
                    {this.renderMenu()}
                </div>
            </header>
        );
    }

    private renderPrivateNav = () => (
        <div className="pg-header__user">
            <NavIconLink
                name="Orders"
                url="/orders"
                icon={ordersIcon}
            />
            <NavIconLink
                name="Wallets"
                url="/wallets"
                icon={walletsIcon}
            />
            <HeaderDropdown />
            <img className="pg-header__theme-toggler" src={sunIcon} alt="Toggle color theme" />
        </div>
    );

    private renderMenu = () => {
        const { user } = this.props;
        return (
            <div className="pg-header-menu">
                {user.email && user.email.length > 0 && this.renderRoutesForAuthorizedUser()}
                <div className="pg-header-menu__section">
                    {this.renderPrivateRoutes(this.getPublicRoutes())}
                </div>
            </div>
        );
    };

    private renderRoutesForAuthorizedUser = () => (
        <React.Fragment>
            <div className="pg-header-menu__section">
                {this.renderPrivateRoutes(this.getMainRoutes())}
            </div>
            <div className="pg-header-menu__section">
                {this.renderPrivateRoutes(this.getProfileRoutes())}
            </div>
        </React.Fragment>
    )

    private renderPrivateRoutes = routes => (
        routes.map((route, index) => {
            const onClick = route.onClick || this.toggleModal;
            return (
                <Link key={`${route.name}${index}`} className="pg-header-menu__item" onClick={onClick} to={route.to}>
                    {route.icon && <img src={route.icon} aria-hidden={true}/>}
                    <p>{route.name}</p>
                </Link>
            );
        })
    );

    private toggleModal = () => {
        this.setState(prev => ({
            isActive: !prev.isActive,
        }));
    }

    private handleLogout = event => {
        event.preventDefault();
        clearLocalStorage();
        this.props.logout();
        this.toggleModal();
        window.location.pathname = '/signin';
    }

    private getMainRoutes = () => ([
        { icon: ordersIcon, name: 'Orders', to: '/orders' },
        { icon: walletsIcon, name: 'Wallets', to: '/wallets' },
    ])

    private getProfileRoutes = () => {
        const { user } = this.props;
        const userName = user.email ? user.email.split('@')[0] : 'Profile';
        return [
            { icon: profileIcon, name: userName, to: '/dashboard/profile' },
            { icon: dashboardIcon, name: 'Dashboard', to: '/dashboard' },
            { icon: logoutIcon, name: 'Logout', to: '#', onClick: this.handleLogout },
        ];
    }

    private getPublicRoutes = () => (
        pgRoutes(this.props.user.email.length > 0).map(route => ({
            name: route[0],
            to: route[1],
        }))
    )
}

const mapStateToProps = state => ({
    user: selectUser(state),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(userLogout()),
    toggleSidebar: () => dispatch(toggleSidebar()),
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export {
    Header,
};
