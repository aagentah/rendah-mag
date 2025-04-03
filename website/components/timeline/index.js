import React, { useState, useEffect } from 'react';

const Timeline = () => {
  const [months, setMonths] = useState([]);
  // Sample events - in a real app you'd pass these as props or fetch from an API
  const monthEvents = {
    '-4': 'Issue 010',
    '-3': '',
    '-2': '',
    '-1': '',
    0: 'Issue 011',
    1: '',
    2: '',
    3: '',
    4: 'Issue 012',
  };

  useEffect(() => {
    const generateMonthsData = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const monthsArray = [];

      // Generate 9 months: 4 previous, current, and 4 future
      for (let i = -4; i <= 4; i++) {
        let monthIndex = currentMonth + i;
        let year = currentYear;

        if (monthIndex < 0) {
          monthIndex += 12;
          year -= 1;
        } else if (monthIndex > 11) {
          monthIndex -= 12;
          year += 1;
        }

        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

        monthsArray.push({
          name: monthNames[monthIndex],
          shortName: monthNames[monthIndex].substring(0, 3),
          index: i,
          isCurrentMonth: i === 0,
          isNewYear: monthIndex === 0,
          year: year,
          event: monthEvents[i.toString()] || '',
        });
      }

      setMonths(monthsArray);
    };

    generateMonthsData();

    // Update timeline every hour to keep it current
    const intervalId = setInterval(() => {
      generateMonthsData();
    }, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full container mx-auto py-12">
      <div className="bg-neutral-900 p-12">
        <h2 className="text-lg mb-12 text-neutral-400">Print Timeline</h2>

        {/* Desktop Timeline (hidden on small screens) */}
        <div className="relative hidden md:block">
          {/* Timeline bar */}
          <div className="absolute h-0.5 bg-neutral-400 top-7 left-0 right-0 z-0"></div>

          {/* Months */}
          <div className="flex justify-between relative z-10">
            {months.map((month, index) => (
              <div key={index} className="flex flex-col items-center w-48">
                {/* Month name */}
                <div
                  className={`text-sm -translate-y-4 ${
                    month.isCurrentMonth
                      ? 'text-rendah-red'
                      : 'text-neutral-400'
                  } ${month.index < 0 ? 'opacity-50' : ''}`}
                >
                  {month.shortName}
                </div>

                {/* Month dot/indicator */}
                <div
                  className={`w-4 h-4 rounded-full mb-2 flex items-center justify-center ${
                    month.isCurrentMonth
                      ? 'bg-rendah-red'
                      : month.isNewYear
                      ? ''
                      : 'bg-neutral-400'
                  }`}
                >
                  {/* Year (only show if different from previous) */}
                  {month.isNewYear && (
                    <span className="bg-neutral-900 text-neutral-400 border border-neutral-400 text-xs px-3 py-1">
                      {month.year}
                    </span>
                  )}
                </div>

                {/* Event */}
                {month.event && (
                  <div
                    className={`mt-4 text-xs text-neutral-400 flex items-center text-center ${
                      month.index < 0 ? 'opacity-50' : ''
                    }`}
                  >
                    {month.event}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline (vertical, visible only on small screens) */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical Timeline bar */}
            <div className="absolute w-0.5 bg-neutral-400 top-0 bottom-0 left-4 z-0"></div>

            {/* Months */}
            <div className="relative z-10">
              {months.map((month, index) => (
                <div
                  key={index}
                  className="flex items-start mb-6 pl-12 relative min-h-12"
                >
                  {/* Month dot/indicator */}
                  <div
                    className={`w-4 h-4 absolute left-2 top-1 ${
                      month.isCurrentMonth
                        ? 'bg-rendah-red rounded-full'
                        : month.isNewYear
                        ? 'bg-neutral-400'
                        : 'bg-neutral-400 rounded-full'
                    }`}
                  >
                    {/* {month.isNewYear && (
                    <span className="absolute -left-3 bg-neutral-800 text-neutral-400 border border-neutral-400 text-xxs px-2 py-1">
                      {month.year}
                    </span>
                  )} */}
                  </div>

                  <div className="flex flex-col">
                    {/* Month name */}
                    <div
                      className={`text-sm ${
                        month.isCurrentMonth
                          ? 'text-rendah-red'
                          : 'text-neutral-400'
                      } ${month.index < 0 ? 'opacity-50' : ''}`}
                    >
                      {month.name}
                    </div>

                    {/* Event */}
                    {month.event && (
                      <div
                        className={`mt-1 text-xs text-neutral-400 ${
                          month.index < 0 ? 'opacity-50' : ''
                        }`}
                      >
                        {month.event}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
