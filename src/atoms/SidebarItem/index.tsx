import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
    title: string;
    url: string;
    onClick: () => void;
    active?: boolean;
    activeIcon?: string;
    icon?: string;
    header?: boolean;
    parent?: boolean;
    subroute?: boolean;
}

const renderIcon = (icon: string) => (
    <img className="bitto-sidebar-item__icon" src={icon} aria-hidden={true} />
);

const SidebarItem: React.SFC<SidebarItemProps> = props => {
    const {
        active,
        activeIcon,
        icon,
        header,
        title,
        subroute,
        url,
        parent,
        onClick,
    } = props;
    const className = cn('bitto-sidebar-item', {
        'bitto-sidebar-item--header': header,
        'bitto-sidebar-item--sub-route': subroute,
        'bitto-sidebar-item--active': active,
        'bitto-sidebar-item--parent': parent,
    });
    return (
        <div>
            <Link onClick={onClick} className={className} to={url}>
                {active ? activeIcon && renderIcon(activeIcon) : icon && renderIcon(icon)}
                {title}
            </Link>
        </div>
    );
};

export {
   SidebarItem,
   SidebarItemProps,
};
