import * as React from 'react';

import logo = require('../../assets/icons/logo.svg');

const Logo: React.SFC = () => {
    return (
        <div className="pg-logo">
            <img src={logo} className="pg-logo__img" alt="Logo" />
        </div>
    );
};

export {
    Logo,
};
