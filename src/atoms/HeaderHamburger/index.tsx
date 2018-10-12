import cn from 'classnames';
import * as React from 'react';

interface HeaderHamburgerProps {
    active: boolean;
}

const HeaderHamburger: React.SFC<HeaderHamburgerProps> = props => {
    const { active } = props;
    const className = cn('bitte-ham', {
        'bitte-ham--active': active,
    });

    return (
        <svg className={className} viewBox="0 0 100 100" width="60">
            <path
                className="bitte-ham__line bitte-ham__line--top"
                d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
            />
            <path className="bitte-ham__line bitte-ham__line--middle" d="m 70,50 h -40" />
            <path
                className="bitte-ham__line bitte-ham__line--bottom"
                d="
                m 69.575405,67.073826
                h -40
                 c -5.592752,0 -6.873604,
                   -9.348582 1.371031,
                   -9.348582 8.244634,
                   0 19.053564,21.797129
                   19.053564,12.274756
                   l 0,-40
                "
            />
        </svg>
    );
};

export {
    HeaderHamburger,
    HeaderHamburgerProps,
};
