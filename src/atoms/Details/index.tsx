import * as React from 'react';

interface DetailsProps {
    title: string;
    children: React.ReactNode;
}

const Details: React.SFC<DetailsProps> = props => (
    <div className="pg-details">
        <p className="pg-details__title">{props.title}</p>
        <div className="pg-details__content">
            {props.children}
        </div>
    </div>
);

export {
    Details,
    DetailsProps,
};
