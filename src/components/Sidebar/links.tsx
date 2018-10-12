import dashboardIcon = require('../../assets/icons/dashboard-dark.svg');
import dashboardActiveIcon = require('../../assets/icons/dashboard.svg');
import oneClickTradeIcon = require('../../assets/icons/one-click-dark.svg');
import oneClickTradeActiveIcon = require('../../assets/icons/one-click.svg');
import referralProgramIcon = require('../../assets/icons/referral-dark.svg');
import referralProgramActiveIcon = require('../../assets/icons/referral.svg');
import accountActiveIcon = require('../../assets/icons/user-active.svg');
import accountIcon = require('../../assets/icons/user-dark.svg');

const getRoutes = () => ([
    {
        title: 'Dashboard',
        url: '/dashboard',
        header: true,
        icon: dashboardIcon,
        activeIcon: dashboardActiveIcon,
    },
    {
        title: 'Account',
        url: '/dashboard/account',
        icon: accountIcon,
        activeIcon: accountActiveIcon,
        parent: true,
    },
    {
        title: 'My Profile',
        url: '/dashboard/account/profile',
        subroute: true,
    },
    {
        title: 'KYC',
        url: '#',
        subroute: true,
    },
    {
        title: 'Log in Activity',
        url: '#',
        subroute: true,
    },
    {
        title: 'Two-Factor Authentication',
        url: '#',
        subroute: true,
    },
    {
        title: 'Referral Program',
        url: '/dashboard/referral-program',
        icon: referralProgramIcon,
        activeIcon: referralProgramActiveIcon,
    },
    {
        title: 'One Click Trade',
        url: '/dashboard/one-click-trade',
        icon: oneClickTradeIcon,
        activeIcon: oneClickTradeActiveIcon,
    },
]);

export {
    getRoutes,
};
