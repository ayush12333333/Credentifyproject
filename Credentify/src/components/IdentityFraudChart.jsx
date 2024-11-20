import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
{/*   use npm install recharts */ }
const IdentityFraudChart = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Identity Fraud Reduction (Billions USD)</h2>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default IdentityFraudChart;
