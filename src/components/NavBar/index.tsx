import {
    CoreState,
    selectUser,
    userLogout,
} from '@openware/core-data';
import classnames from 'classnames';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { pgRoutes } from '../../constants';
import { RootState } from '../../modules';

// tslint:disable
export interface ReduxProps {
    address: string;
    user: CoreState['user'];
}

interface DispatchProps {
    logout: typeof userLogout;
}

export interface OwnProps {
    onLinkChange?: () => void;
    history: any;
}

type NavbarProps = OwnProps & ReduxProps & RouteProps & DispatchProps;

const shouldUnderline = (
    address: string, url: string, index: number): boolean =>
    address === url || (address === '/' && index === 0);

const navItem = (
    address: string, onLinkChange?: () => void,
) => (values: string[], index: number) => {
    const [name, url] = values;
    const cx = classnames('pg-navbar__content-item pg-navbar__content-item-hover', {
        'pg-navbar__content-item--active': shouldUnderline(address, url, index),
        'pg-navbar__content-item--hot': name === 'Divident',
    });

    const handleLinkChange = () => {
        if (onLinkChange) {
            onLinkChange();
        }
    };

    return (
        <li onClick={handleLinkChange} key={index}>
            <Link className={cx} to={url}>{name}</Link>
        </li>
    );
};

class NavBarComponent extends React.Component<NavbarProps> {
    public render() {
        const { location, user } = this.props;
        const address = location ? location.pathname : '';

        return (
            <div className="pg-navbar">
                <ul className="pg-navbar__content">
                    {pgRoutes(user.email.length > 0).map(navItem(address, this.props.onLinkChange))}
                </ul>
                {user.email.length > 0 ? null : <ul className="pg-navbar__content">
                    <li>
                        <Link className="pg-navbar__content-item" to="/dashboard/signin">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="pg-navbar__content-item pg-navbar__content-signup"
                            to="/dashboard/signup">
                            Sign Up
                        </Link>
                    </li>
                </ul>}
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> =
    (state: RootState): ReduxProps => ({
        address: '',
        user: selectUser(state),
    });

const mapDispatchToProps: DispatchProps = ({
    logout: userLogout,
});

// tslint:disable
const NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarComponent) as any) as any;

export {
    NavBar,
};
