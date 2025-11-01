// components/RevenueChart.tsx
"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function RevenueChart() {
  const data = [
    { maand: "Jan", omzet: 24000, cashflow: 8000 },
    { maand: "Feb", omzet: 27500, cashflow: 9200 },
    { maand: "Mrt", omzet: 26000, cashflow: 8800 },
    { maand: "Apr", omzet: 27450, cashflow: 9240 },
  ];

  return (
    <div className="mt-6 border border-dashed rounded-xl p-4 h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="maand" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="omzet" stroke="#2F6B4F" strokeWidth={2} dot={{ r: 3 }} name="Omzet (€)" />
          <Line type="monotone" dataKey="cashflow" stroke="#7ABF9F" strokeWidth={2} dot={{ r: 3 }} name="Cashflow (€)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
