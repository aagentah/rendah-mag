import React, { useState, useEffect } from "react";
import "./table.css";

const RecentPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchRecentPayments = async () => {
      try {
        const response = await fetch(
          // "http://localhost:3000/api/stripe/recent-orders",
          "https://rendahmag.com/api/stripe/recent-orders",
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
        setPayments(data);
      } catch (error) {
        console.error("Error fetching recent payments data: ", error);
      }
    };

    fetchRecentPayments();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>City</th>
            <th>County/Province</th>
            <th>Post Code</th>
            <th>Country</th>
            <th>Payment Date</th>
            <th>Payment Amount</th>
            <th>Product(s) Names</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.email}</td>
              <td>{payment.name}</td>
              <td>{payment.address_line_1}</td>
              <td>{payment.address_line_2}</td>
              <td>{payment.city}</td>
              <td>{payment.county_province}</td>
              <td>{payment.post_code}</td>
              <td>{payment.country}</td>
              <td>
                {payment.payment_date
                  ? new Date(payment.payment_date).toLocaleString()
                  : "N/A"}
              </td>
              <td>{payment.payment_amount}</td>
              <td>{payment.products}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPayments;
