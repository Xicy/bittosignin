import * as React from 'react';
import { Switch, SwitchOption } from '../../atoms';

type OnOptionSelect = (value: string) => void;

interface OneClickCurrencySwitchProps {
    cryptoCurrencyOptions: SwitchOption[];
    currencyOptions: SwitchOption[];
    onCryptoCurrencySelect: OnOptionSelect;
    onCurrencySelect: OnOptionSelect;
    onSideSelect: OnOptionSelect;
    sideOptions: SwitchOption[];
}

const OneClickCurrencySwitch: React.SFC<OneClickCurrencySwitchProps> = props => {
    const {
        cryptoCurrencyOptions,
        currencyOptions,
        onCryptoCurrencySelect,
        onCurrencySelect,
        onSideSelect,
        sideOptions,
    } = props;
    return (
        <div className="bitto-one-click-trade-options">
            <Switch
                onSelect={onSideSelect}
                options={sideOptions}
            />
            <Switch
                onSelect={onCryptoCurrencySelect}
                options={cryptoCurrencyOptions}
            />
            <Switch
                onSelect={onCurrencySelect}
                options={currencyOptions}
            />
        </div>
    );
};

export {
    OneClickCurrencySwitch,
};
