import React, { useEffect, useState } from "react";
// @why: Import shared table styles for visual consistency across dashboard widgets
import "./table.css";

// @why: Custom dashboard widget for shipping hub metrics, powered by Stripe & Easyship
// const API_URL = "/api/stripe/shipping-hub-metrics";
const API_URL = "http://localhost:3000/api/stripe/shipping-hub-metrics";

export default function ShippingHubMetrics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // @why: Fetch shipping hub metrics from Next.js API
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch metrics");
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading shipping hub metrics...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error.message}</div>;
  if (!data) return <div>No data available.</div>;

  // @why: Render summary and per-address breakdown
  // Calculate total cost across all hubs
  const totalCost = Object.values(data.totalCostByHub).reduce(
    (sum, v) => sum + v,
    0
  ); // @why: Sum all hub costs for total
  return (
    <div style={{ padding: 24 }}>
      <h2>Shipping Hub Metrics</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>Total Subscribers:</strong> {data.total}
      </div>
      <div style={{ display: "flex", gap: 32, marginBottom: 24 }}>
        {Object.keys(data.byHub).map((hub) => (
          <div key={hub}>
            <div style={{ fontWeight: "bold" }}>{hub}</div>
            <div>Cheapest for: {data.byHub[hub]}</div>
            <div>Total cost: £{data.totalCostByHub[hub].toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 24, fontWeight: "bold", fontSize: 16 }}>
        Total Cost (All Hubs): £{totalCost.toFixed(2)}{" "}
        {/* @why: Show total cost across all hubs */}
      </div>
      <h3>Addresses & Cheapest Hub</h3>
      <div
        style={{
          maxHeight: 400,
          overflow: "auto",
          // @why: Remove border and borderRadius, let table.css handle table visuals
          padding: 0,
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Cheapest Hub</th>
              <th>Cost (£)</th>
              <th>Courier</th>
              <th>Service</th>
            </tr>
          </thead>
          <tbody>
            {data.addresses.map((addr, idx) => (
              <tr key={addr.id}>
                <td>{addr.name}</td>
                <td>{addr.email}</td>
                <td>
                  {addr.address.city}, {addr.address.country} (
                  {addr.address.postal_code})
                </td>
                <td>{addr.cheapestHub}</td>
                <td>
                  {addr.cheapestCost && addr.cheapestCost !== Infinity
                    ? addr.cheapestCost.toFixed(2)
                    : "-"}
                </td>
                <td>{addr.cheapest[addr.cheapestHub]?.courier || "-"}</td>
                <td>{addr.cheapest[addr.cheapestHub]?.service || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* @why: Optionally, add export or filter features here in the future */}
    </div>
  );
}
