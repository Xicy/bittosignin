import { Dropdown, OrderInput } from '@openware/components';
import * as React from 'react';

interface CustomAmountOrderInputProps {
    amount: string | number;
    currencies: string[];
    onAmountChange: (amount: string | number) => void;
    onCurrencyChange: (currencyIndex: number) => void;
}

const CustomAmountOrderInput: React.SFC<CustomAmountOrderInputProps> = props => {
    const {
        amount,
        currencies,
        onAmountChange,
        onCurrencyChange,
    } = props;
    return (
        <div className="bitto-custom-amount-order-input">
            <Dropdown list={currencies} onSelect={onCurrencyChange} />
            <OrderInput
                currency=""
                handleChangeValue={onAmountChange}
                value={amount}
            />
        </div>
    );
};

export {
    CustomAmountOrderInput,
};
