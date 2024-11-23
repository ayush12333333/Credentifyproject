import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const AdoptionTrendChart = ({ trendData }) => {
  return (
    <div className="flex items-center justify-center my-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Digital Identity Adoption Trend
        </h2>
        <LineChart width={600} height={300} data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="adoption"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default AdoptionTrendChart;

