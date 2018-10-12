export const PG_TITLE_PREFIX = 'Bitto';

export const pgRoutes = (isLoggedIn: boolean): string[][] => {
    const routes = [
        ['Exchange', '/trading'],
        ['P2P Trading', '#'],
        ['Divident', '#'],
        ['Refer your Friends', '/dashboard/referral-program'],
        ['Premier Investor', '#'],
    ];
    return routes;
};
