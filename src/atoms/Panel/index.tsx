import cn from 'classnames';
import * as React from 'react';

interface PanelProps {
    children: React.ReactNode;
    title?: string;
    renderAction?: () => React.ReactNode;
}

const renderHeader = (title: PanelProps['title'], renderAction: PanelProps['renderAction']) => (
    <div className="pg-panel__header">
        {title && <p className="pg-panel__title">{title}</p>}
        {renderAction && <div className="pg-panel__title-action">{renderAction()}</div>}
    </div>
);

const Panel: React.SFC<PanelProps> = props => {
    const { children, renderAction, title } = props;
    const className = cn('pg-panel', {
        'pg-panel--no-header': !title,
    });
    return (
        <div className={className}>
            {title && renderHeader(title, renderAction)}
            <div className="pg-panel__content">
                {children}
            </div>
        </div>
    );
};

export {
    Panel,
    PanelProps,
};
