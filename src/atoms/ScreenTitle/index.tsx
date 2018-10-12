import * as React from 'react';

interface ScreenTitleProps {
  title: string;
  subtitle: string;
}

const ScreenTitle: React.SFC<ScreenTitleProps> = props => (
  <div className="pg-screen-title">
    <h1 className="pg-screen-title__title">{props.title}</h1>
    <h2 className="pg-screen-title__subtitle">{props.subtitle}</h2>
  </div>
);

export {
  ScreenTitle,
  ScreenTitleProps,
};
