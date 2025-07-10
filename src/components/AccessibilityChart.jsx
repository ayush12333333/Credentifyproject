import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const AccessibilityChart = ({ data, colors }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handlePieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handlePieClick = (data, index) => {
    alert(`Region: ${data.region}, Access: ${data.access}%`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Digital Identity Access (%)</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="access"
          onMouseEnter={handlePieEnter}
          onClick={handlePieClick}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              stroke={activeIndex === index ? '#000' : 'none'}
              strokeWidth={activeIndex === index ? 2 : 1}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default AccessibilityChart;
