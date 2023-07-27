import React, { useState } from 'react';

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion">
      {data.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => toggleAccordion(index)}
        >
          <div className="question">{item.question}</div>
          <div className="answer">{index === activeIndex && item.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
