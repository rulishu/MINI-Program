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
  destroyInactiveTabPane: false,
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
    destroyInactiveTabPane,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };

  const titlesRef = useRef([]);
  const [activeKey, setActiveKey] = useState(value);

  useEffect(() => {
    setActiveKey(value);
  }, [value]);

  useEffect(() => {
    let currentIndex = 0;
    titlesRef.current = [];
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
        if (title.paneKey === activeKey) {
          currentIndex = idx;
        }
      }
      titlesRef.current.push(title);
    });
    setCurrentItem(titlesRef.current[currentIndex] || {});
  }, [children, activeKey]);

  const setCurrentItem = (item) => {
    onClick?.(item);
    if (item.disabled) {
      return;
    }
    setActiveKey(item.paneKey);
    onChange?.(item);
  };

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

  const index = titlesRef.current.findIndex((t) => t.paneKey === activeKey);

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

  return (
    <div className={classes} {...rest}>
      <div className={classesTitle} style={{ ...tabStyle, background }}>
        {!!titleNode && typeof titleNode === 'function'
          ? titleNode()
          : titlesRef.current.map((item) => (
              <div
                style={titleStyle}
                onClick={() => setCurrentItem(item)}
                className={classNames(
                  {
                    active: !item.disabled && String(item.paneKey) === String(activeKey),
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
              activeKey: activeKey,
            };

            const paneKey = getPaneKey(child.props?.paneKey, idx);
            const isActiveTab = paneKey === activeKey;
            const shouldRenderTabPane = isActiveTab && !destroyInactiveTabPane;

            if (!shouldRenderTabPane && autoHeight) {
              return null;
            }

            if (!shouldRenderTabPane) {
              childProps = {
                ...childProps,
                style: {
                  ...childProps.style,
                  display: 'none',
                },
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
