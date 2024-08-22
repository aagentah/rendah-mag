import React, { useState, useEffect } from "react";
import "./table.css";

const FailedPaymentsReport = () => {
  const [failedPayments, setFailedPayments] = useState([]);

  useEffect(() => {
    const fetchFailedPayments = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/stripe/failed-payments",
          // "https://rendahmag.com/api/stripe/failed-payments",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFailedPayments(data);
      } catch (error) {
        console.error("Error fetching failed payments data: ", error);
      }
    };

    fetchFailedPayments();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Failed Payments Count</th>
            <th>Decline Reasons</th>
          </tr>
        </thead>
        <tbody>
          {failedPayments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.email}</td>
              <td>{payment.name}</td>
              <td>{payment.failed_count}</td>
              <td>{payment.failed_reasons.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FailedPaymentsReport;
