import React from 'react';

const ImpactStatistics = ({ impactData }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {impactData.map((stat, index) => (
        <div key={index} className="bg-white  p-4 rounded-lg shadow flex items-center ">
          {stat.icon}
          <div className="ml-4">
            <h3 className="font-semibold text-black">{stat.name}</h3>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpactStatistics;
