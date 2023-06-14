import React from 'react';
import classNames from 'classnames';

const defaultProps = {
  title: '',
  value: '',
  disabled: false,
};

const TabPane = (props) => {
  const { children, autoHeightClassName, className, disabled } = {
    ...defaultProps,
    ...props,
  };

  const classPrefix = 'nut-tabpane';
  const classes = classNames(
    {
      active: !disabled && props.active,
    },
    classPrefix,
    autoHeightClassName,
    className,
  );

  return children ? <div className={classes}>{!disabled && children}</div> : null;
};

export default TabPane;
