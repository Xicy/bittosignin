import * as React from 'react';
import exportIcon = require('../../assets/icons/export.svg');

interface ExportButtonProps {
    url: string;
}

const ExportButton: React.SFC<ExportButtonProps> = props => (
    <div className="pg-export-button">
        <a className="pg-export-button__link" href={props.url}>Export</a>
        <img className="pg-export-button__icon" src={exportIcon} aria-hidden={true} />
    </div>
);

export {
    ExportButton,
    ExportButtonProps,
};
