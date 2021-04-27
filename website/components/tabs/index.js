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

  useEffect(() => {
    if (content && content.length) {
      itemsRef.current = itemsRef.current.slice(0, content.length);
    }
  }, [content]);

  const handleToggle = (id, i) => {
    setVisibleTab(id);

    if (onToggle) {
      const current = itemsRef.current[i];
      onToggle(id, current);
    }
  };

  const listTitles = content.map((item, i) => (
    <li
      role="button"
      key={item.id}
      onClick={() => handleToggle(item.id, i)}
      className={`tabs__desktop-nav__item ${visibleTab === item.id &&
        'active'}`}
    >
      {item.tabTitle}
    </li>
  ));

  const listContent = content.map((item, i) => (
    <div
      key={item.id}
      ref={el => (itemsRef.current[i] = el)}
      className={`tabs__body__item ${visibleTab === item.id && 'active'}`}
    >
      <div
        role="button"
        className="tabs__mobile-nav__item"
        onClick={() => handleToggle(item.id === visibleTab ? null : item.id, i)}
      >
        {item.tabTitle}
      </div>
      <div className="tabs__content">{item.tabContent}</div>
    </div>
  ));

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
