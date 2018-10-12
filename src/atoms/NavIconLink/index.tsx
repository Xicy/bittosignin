import * as React from 'react';

interface NavIconLinkProps {
    name: string;
    url: string;
    icon: string;
    count?: number;
}

const NavIconLink: React.SFC<NavIconLinkProps> = props => (
    <a className="pg-nav-icon-link" href={props.url}>
        {props.count && <span className="pg-nav-icon-link__count">{props.count}</span>}
        <img src={props.icon} alt={props.name} />
    </a>
);

export {
    NavIconLink,
    NavIconLinkProps,
};
