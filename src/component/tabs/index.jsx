import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import bem from '../../utils/bem';
import Icon from '@nutui/nutui-react-taro';
import TabPane from '../tabpane';

class Title {
  title = '';

  paneKey = '';

  disabled = false;

  index = 0;

  // eslint-disable-next-line no-useless-constructor
  constructor() {}
}

const defaultProps = {
  className: '',
  style: {},
  tabStyle: {},
  value: 0,
  color: '',
  background: '',
  direction: 'horizontal',
  type: 'line',
  titleScroll: false,
  ellipsis: true,
  animatedTime: 300,
  titleGutter: 0,
  size: 'normal',
  leftAlign: false,
  autoHeight: false,
};
const pxCheck = (value) => {
  return Number.isNaN(Number(value)) ? String(value) : `${value}px`;
};
const Tabs = (props) => {
  const {
    value,
    color,
    tabStyle,
    background,
    direction,
    type,
    titleScroll,
    ellipsis,
    animatedTime,
    titleGutter,
    size,
    leftAlign,
    titleNode,
    children,
    onClick,
    onChange,
    className,
    autoHeight,
    iconClassPrefix,
    iconFontClassName,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };

  // eslint-disable-next-line no-unused-vars
  const [currentItem, setCurrentItem] = useState({ index: 0 });
  const titles = useRef([]);

  useEffect(() => {
    let currentIndex = 0;
    titles.current = [];
    // eslint-disable-next-line consistent-return
    React.Children.forEach(children, (child, idx) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      const title = new Title();
      const childProps = child?.props;
      if (childProps?.title || childProps?.paneKey) {
        title.title = childProps?.title;
        title.paneKey = getPaneKey(childProps?.paneKey, idx);
        title.disabled = childProps?.disabled;
        title.index = idx;
        if (title.paneKey === value) {
          currentIndex = idx;
        }
      }
      titles.current.push(title);
    });
    setCurrentItem(titles.current[currentIndex]);
  }, [children]);

  const b = bem('tabs');
  const classes = classNames(direction, b(''), className);
  const classesTitle = classNames(
    {
      [type]: type,
      scrollable: titleScroll,
      [size]: size,
    },
    `${b('')}__titles`,
  );

  const titleStyle = {
    marginLeft: pxCheck(titleGutter),
    marginRight: pxCheck(titleGutter),
  };

  const tabsActiveStyle = {
    color: type === 'smile' ? color : '',
    background: type === 'line' ? color : '',
  };

  const index = titles.current.findIndex((t) => t.paneKey === value);

  const contentStyle = {
    transform:
      direction === 'horizontal'
        ? `translate3d(-${index * 100}%, 0, 0)`
        : `translate3d( 0,-${index * 100}%, 0)`,
    transitionDuration: `${animatedTime}ms`,
  };

  const getPaneKey = (paneKey, i) => {
    return typeof paneKey === 'string' ? paneKey : String(paneKey || i);
  };

  const tabChange = (item) => {
    onClick && onClick(item);
    if (item.disabled) {
      return;
    }
    setCurrentItem(item);
    onChange && onChange(item);
  };

  return (
    <div className={classes} {...rest}>
      <div className={classesTitle} style={{ ...tabStyle, background }}>
        {!!titleNode && typeof titleNode === 'function'
          ? titleNode()
          : titles.current.map((item, i) => (
            <div
              style={titleStyle}
              onClick={() => tabChange(item, i)}
              className={classNames(
                {
                  active: !item.disabled && String(item.paneKey) === String(value),
                  disabled: item.disabled,
                  'nut-tabs__titles-item-left-align': leftAlign,
                },
                `${b('')}__titles-item`,
              )}
              key={item.paneKey}
            >
              {type === 'line' && (
                <div className={`${b('')}__titles-item__line`} style={tabsActiveStyle} />
              )}
              {type === 'smile' && (
                <div className={`${b('')}__titles-item__smile`} style={tabsActiveStyle}>
                  <Icon
                    classPrefix={iconClassPrefix}
                    fontClassName={iconFontClassName}
                    color={color}
                    name="joy-smile"
                  />
                </div>
              )}
              <div
                className={classNames(
                  {
                    ellipsis: ellipsis && !titleScroll && direction === 'horizontal',
                  },
                  `${b('')}__titles-item__text`,
                )}
              >
                {item.title}
              </div>
            </div>
          ))}
      </div>
      <div className={`${b('')}__content__wrap`}>
        <div className={`${b('')}__content`} style={contentStyle}>
          {React.Children.map(children, (child, idx) => {
            if (!React.isValidElement(child)) {
              return null;
            }

            let childProps = {
              ...child.props,
              activeKey: value,
            };

            if (String(value) !== getPaneKey(child.props?.paneKey, idx) && autoHeight) {
              childProps = {
                ...childProps,
                autoHeightClassName: 'inactive',
              };
            }
            return React.cloneElement(child, childProps);
          })}
        </div>
      </div>
    </div>
  );
};

Tabs.defaultProps = defaultProps;
Tabs.displayName = 'NutTabs';
Tabs.TabPane = TabPane;

export default Tabs;
