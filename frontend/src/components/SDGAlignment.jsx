import React from 'react';

const SDGAlignment = ({ sdgAlignment }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">UN Sustainable Development Goals Alignment</h2>
      <div className="grid grid-cols-2 gap-4">
        {sdgAlignment.map((sdg, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center">
            {sdg.icon}
            <div className="ml-4">
              <h3 className="font-semibold">{sdg.goal}</h3>
              <p>{sdg.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SDGAlignment;
