import React, { useState, useEffect } from "react";
import "./table.css";

const StripeMetrics = () => {
  const [results, setResults] = useState([]);
  const [weeklySubs, setWeeklySubs] = useState([]);

  useEffect(() => {
    const fetchMonthlySubs = async () => {
      try {
        const response = await fetch(
          // "http://localhost:3000/api/stripe/subs-per-month",
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

    fetchMonthlySubs();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Month-Year</th>
            <th>Subscriptions</th>
            <th>Cancelled</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={index}>
              <td>{item.monthYear}</td>
              <td>{item.subs}</td>
              <td>{item.cancelled}</td>
              <td>{item.total}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>
                {results.reduce((sum, item) => sum + item.subs, 0)}
              </strong>
            </td>
            <td>
              <strong>
                {results.reduce((sum, item) => sum + item.cancelled, 0)}
              </strong>
            </td>
            <td>
              <strong>
                {results.reduce((sum, item) => sum + item.total, 0)}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StripeMetrics;
