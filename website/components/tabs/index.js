import React, { useEffect, useState, useRef } from 'react';

/**
 * A card displays site content in a manner similar to a playing card.
 */

export default function Tabs(props) {
  const {
    /* Options */
    content,
    defaultSelected,
    onToggle
  } = props;

  const itemsRef = useRef([]);
  const [visibleTab, setVisibleTab] = useState(defaultSelected);
  const [theArray, setTheArray] = useState([]);

  useEffect(() => {
    if (defaultSelected && !theArray.includes(defaultSelected)) {
      setTheArray([...theArray, defaultSelected]);
    }

    if (content && content.length) {
      itemsRef.current = itemsRef.current.slice(0, content.length);
    }
  }, [content]);

  const handleToggle = (id, i) => {
    setVisibleTab(id);

    if (!theArray.includes(id)) {
      setTheArray([...theArray, id]);
    }

    if (onToggle) {
      const current = itemsRef.current[i];
      onToggle(id, current);
    }
  };

  const listTitles = content.map((item, i) => (
    <li
      role="button"
      key={item.id}
      data-tab-nav-item={item.id}
      onClick={() => handleToggle(item.id, i)}
      className={`tabs__desktop-nav__item ${visibleTab === item.id &&
        'active'}`}
    >
      {item.tabTitle && (
        <div className="tabs__desktop-nav__item__title">{item.tabTitle}</div>
      )}

      {item.tabIcon && (
        <div className="tabs__desktop-nav__item__icon">{item.tabIcon}</div>
      )}
    </li>
  ));

  const listContent = content.map((item, i) => {
    const Content = item.tabContent;

    return (
      <div
        key={item.id}
        ref={el => (itemsRef.current[i] = el)}
        className={`tabs__body__item ${visibleTab === item.id && 'active'}`}
      >
        <div
          role="button"
          data-tab-nav-item={item.id}
          className="tabs__mobile-nav__item"
          onClick={() =>
            handleToggle(item.id === visibleTab ? null : item.id, i)
          }
        >
          {item.tabIcon && (
            <div className="tabs__mobile-nav__item__icon">{item.tabIcon}</div>
          )}

          {item.tabTitle && (
            <div className="tabs__mobile-nav__item__title">{item.tabTitle}</div>
          )}
        </div>
        <div className="tabs__content">
          {(visibleTab === item.id || theArray.includes(item.id)) && (
            <Content handleToggle={handleToggle} />
          )}
        </div>
      </div>
    );
  });

  if (content) {
    return (
      <div className="tabs">
        <ul className="tabs__desktop-nav">{listTitles}</ul>
        <div className="tabs__body">{listContent}</div>
      </div>
    );
  }

  return false;
}
