import React, { useState } from 'react';

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-xl text-neutral-400">
      {data.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            onClick={() => toggleAccordion(index)}
            className="mb-2 transition-colors duration-300 ease-in-out"
          >
            <div className="relative font-bold text-sm leading-tight py-4 cursor-pointer">
              {item.question}
              <span
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-no-repeat bg-center transition-transform duration-300 ${
                  isActive ? 'rotate-180' : 'rotate-0'
                }`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z'/%3E%3C/svg%3E\")",
                  backgroundSize: '70%',
                }}
              />
            </div>
            {isActive && (
              <div className="border-l-4 border-rendah-red pl-4 text-neutral-300 text-sm leading-relaxed pb-4 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
