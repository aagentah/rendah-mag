import React, { useState, useEffect } from "react";

const StripeMetrics = () => {
  const [results, setResults] = useState([]);
  const [weeklySubs, setWeeklySubs] = useState([]);

  useEffect(() => {
    const fetchMonthlySubs = async () => {
      try {
        const response = await fetch(
          "https://rendahmag.com/api/stripe/subs-per-month",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching monthly subs data: ", error);
      }
    };

    // const fetchWeeklySubs = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://593f-146-70-132-236.ngrok-free.app/api/stripe/subs-per-week",
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         method: "POST",
    //       }
    //     );
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     setWeeklySubs(data);
    //   } catch (error) {
    //     console.error("Error fetching weekly subs data: ", error);
    //   }
    // };

    fetchMonthlySubs();
    // fetchWeeklySubs();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Month-Year</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={index}>
              <td>{item.monthYear}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        //   <table>
        //   <thead>
        //     <tr>
        //       <th>week</th>
        //       <th>month</th>
        //       <th>year</th>
        //       <th>count</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {weeklySubs.map((item, index) => (
        //       <tr key={index}>
        //         <td>{item.weekNumberOfMonth}</td>
        //         <td>{item.monthName}</td>
        //         <td>{item.year}</td>
        //         <td>{item.count}</td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
      }
    </>
  );
};

export default StripeMetrics;
