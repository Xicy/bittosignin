import cn from 'classnames';
import * as React from 'react';

interface SwitchOption {
    label: string;
    value: string;
}

type OnChangeCallback = (value: SwitchOption['value']) => void;

interface SwitchProps {
    options: SwitchOption[];
    onSelect: OnChangeCallback;
}

interface SwitchState {
    selectedValueIndex: number;
}

class Switch extends React.Component<SwitchProps, SwitchState> {
    public state = {
        selectedValueIndex: 0,
    };

    public render() {
        return (
            <div className="bitto-switch">
                {this.props.options.map(this.renderOption)}
            </div>
        );
    }

    private renderOption = (option: SwitchOption, index: number) => {
        const { label, value } = option;
        const className = cn('bitto-switch__option', {
           'bitto-switch__option--selected': index === this.state.selectedValueIndex,
        });
        return (
            <span
                className={className}
                key={index}
                onClick={this.handleOnSelect(value, index)}
            >
                {label}
            </span>
        );
    }

    private handleOnSelect = (value: SwitchOption['value'], index: number) => () => {
        this.setState({
            selectedValueIndex: index,
        }, () => {
            this.props.onSelect(value);
        });
    }
}

export {
    Switch,
    SwitchOption,
};
