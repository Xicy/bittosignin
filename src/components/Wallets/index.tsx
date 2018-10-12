import {
    DepositCrypto,
    DepositFiat,
    FilterInput,
    Loader,
    TabPanel,
    WalletItemProps,
    WalletList,
    Withdraw,
} from '@openware/components';
import {
    accountAddress,
    accountWallets,
    CoreError,
    selectAccountAddressError,
    selectAccountAddressLoading,
    selectAccountWallets,
    selectAccountWalletsError,
    selectAccountWalletsLoading,
} from '@openware/core-data';

import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { RootState } from '../../modules';

interface ReduxProps {
    wallets: WalletItemProps[];
    walletsError?: CoreError;
    walletsLoading?: boolean;
    addressError?: CoreError;
    addressLoading?: boolean;
    // withdrawError: CoreError;
}

interface DispatchProps {
    fetchWallets: typeof accountWallets;
    fetchAddress: typeof accountAddress;
}

interface WalletsState {
    filteredWallets: WalletItemProps[] | null;
    selectedWallet?: WalletItemProps;
}

type Props = ReduxProps & DispatchProps;

const title = 'You can deposit in bank on this credential';
const description = 'Please use information below ' +
    'to complete you bank peyment. Your deposit will' +
    ' be reflected in your account within two business days.';
const bankData = [
    {
        key: 'Bank Name',
        value: 'Diamant Bank',
    },
    {
        key: 'Account number',
        value: '10120212',
    },
    {
        key: 'Account name',
        value: 'name',
    },
    {
        key: 'Phone Number',
        value: '+3 8093 1212 12 12',
    },
    {
        key: 'Your reference code',
        value: '8374982374',
    },
];

class WalletsComponent extends React.Component<Props, WalletsState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            filteredWallets: null,
        };

        this.searchCallback = this.searchCallback.bind(this);
        this.onWalletSelectionChange = this.onWalletSelectionChange.bind(this);
    }

    public componentDidMount() {
        this.props.fetchWallets();
    }

    public componentWillReceiveProps(next: Props) {
        // if (this.props.withdrawError!.message !==
        // next.withdrawError!.message) { alert(next.withdrawError!.message); }

        if (!this.state.selectedWallet) {
            this.setState({ ...this.state, selectedWallet: next.wallets[0] });
        }
    }

    public render() {
        const { wallets } = this.props;
        const { selectedWallet, filteredWallets } = this.state;

        if (this.props.walletsLoading || this.props.wallets.length < 1) {
            return (
                <div className="pg-wallet">
                    <div className="pg-wallet__loading">
                        <Loader />
                    </div>
                </div>
            );
        }

        const maybeNoResults = filteredWallets && !filteredWallets.length
            ? 'No results...'
            : null;

        const maybeSelectedTab = selectedWallet &&
            <TabPanel panels={this.renderTabs(selectedWallet)} />;

        return (
            <div className="pg-wallet pg-container">
                <div>
                    <FilterInput
                        filter={this.handleFilter}
                        onFilter={this.searchCallback}
                        data={wallets}
                    />
                    <p className="pg-wallet__no-results">
                        {maybeNoResults}
                    </p>
                </div>
                <div className="pg-wallet__tabs-content">
                    <WalletList
                        onWalletSelectionChange={this.onWalletSelectionChange}
                        walletItems={filteredWallets || wallets}
                    />
                    <div className="pg-wallet__tabs">
                        {maybeSelectedTab}
                    </div>
                </div>
            </div>
        );
    }

    private consist(a: string, b: string): boolean {
        return a.toLowerCase().indexOf(b.toLowerCase()) !== -1;
    }

    // tslint:disable-next-line: no-any
    private handleFilter = (item: any, term: string) => {
        return this.consist(item.currency, term);
    };

    // tslint:disable-next-line: no-any
    private searchCallback(value: any) {
        this.setState({
            filteredWallets: value,
        });
    }

    private renderTabs(wallet: WalletsState['selectedWallet']) {
        if (!wallet) {
            return [
                {
                    content: null,
                    label: '',
                },
            ];
        }
        const { currency, fee } = wallet;
        const withdrawProps = {
            currency,
            fee,
            onClick: this.handleWithdraw,
        };
        return [
            {
                content: this.renderDeposit(wallet),
                label: 'Deposit',
            },
            // TODO: add renderWithdraw
            {
                content: <Withdraw {...withdrawProps} />,
                label: 'Withdraw',
            },
        ];
    }

    private handleWithdraw = (_amount: number, _rid: string) => undefined;
    // this.props.fetchWithdraw({
    //     amount,
    //     rid,
    //     currency: this.state.selectedWallet!.currency,
    //     otp: 1234,
    //     currency_type: this.state.selectedWallet!.type,
    // });

    private renderDeposit(wallet: WalletItemProps) {
        const text = 'Please submit a ' +
            'deposit payment using one of the ' +
            'following options. You deposit will be' +
            ' reflected in your account ofter 6 confirmation';
        const { type } = wallet;
        const error = this.props.addressLoading
            ? '<loading...>' : this.props.addressError
                ? this.props.addressError.message
                : '<no address>';
        if (type === 'coin') {
            return (
                <DepositCrypto
                    data={wallet.address || ''}
                    error={error}
                    text={text}
                />
            );
        }

        if (type === 'fiat') {
            return (
                <DepositFiat
                    title={title}
                    description={description}
                    data={bankData}
                />
            );
        }

        return null;
    }

    private onWalletSelectionChange(value: WalletItemProps) {
        if (!value.address && !this.props.addressLoading) {
            this.props.fetchAddress(value.currency);
        }
        this.setState({
            selectedWallet: value,
        });
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    wallets: selectAccountWallets(state),
    walletsError: selectAccountWalletsError(state),
    walletsLoading: selectAccountWalletsLoading(state),
    addressError: selectAccountAddressError(state),
    addressLoading: selectAccountAddressLoading(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = ({
    fetchWallets: accountWallets,
    fetchAddress: accountAddress,
});

export const Wallets = connect(mapStateToProps, mapDispatchToProps)(WalletsComponent);
