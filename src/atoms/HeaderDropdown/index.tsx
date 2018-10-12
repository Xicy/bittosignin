import { CoreState, selectUser, userLogout } from '@openware/core-data';
import cn from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dashboardIcon = require('../../assets/icons/dashboard.svg');
import logoutIcon = require('../../assets/icons/logout.svg');
import profileIcon = require('../../assets/icons/profile.svg');
import userActiveIcon = require('../../assets/icons/user-active.svg');
import userIcon = require('../../assets/icons/user.svg');
import { clearLocalStorage } from '../../utils';

interface ReduxProps {
    user: CoreState['user'];
}

interface DispatchProps {
    logout: () => void;
}

type Props = ReduxProps & DispatchProps;

interface State {
    isOpen: boolean;
}

class HeaderDropdownComponent extends React.Component<Props, State> {
    public constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    public render() {
        const { user } = this.props;
        const { isOpen } = this.state;
        const className = cn('bitto-header-dropdown', {
           'bitto-header-dropdown--open': isOpen,
        });

        const userName = user.email ? user.email.split('@')[0] : 'Profile';

        return (
            <div className={className}>
                <div className="bitto-header-dropdown__icon" onClick={this.toggleDropdown}>
                    <img src={isOpen ? userActiveIcon : userIcon} alt="User actions" />
                </div>
                <div className="bitto-header-dropdown__menu bitto-header-menu">
                    <div className="bitto-header-menu__item">
                        <Link to="/dashboard/account/profile">
                            {userName}
                        </Link>
                        <img src={profileIcon} aria-hidden="true" />
                    </div>
                    <div className="bitto-header-menu__item">
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                        <img src={dashboardIcon} aria-hidden="true" />
                    </div>
                    <div className="bitto-header-menu__item">
                        <a href="#" onClick={this.handleLogout}>Logout</a>
                        <img src={logoutIcon} aria-hidden="true" />
                    </div>
                </div>
            </div>
        );
    }

    private toggleDropdown = () => {
        this.setState(state => ({
            isOpen: !state.isOpen,
        }));
    }

    private handleLogout = event => {
        event.preventDefault();
        clearLocalStorage();
        this.props.logout();
        window.location.pathname = '/signin';
    }
}

const mapStateToProps = state => ({
    user: selectUser(state),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(userLogout()),
});

const HeaderDropdown = connect(mapStateToProps, mapDispatchToProps)(HeaderDropdownComponent);

export {
    HeaderDropdown,
};
