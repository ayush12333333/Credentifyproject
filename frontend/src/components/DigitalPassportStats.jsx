import React from 'react';
import IdentityFraudChart from './IdentityFraudChart';
import AccessibilityChart from './AccessibilityChart';

const DigitalPassportStats = () => {
  const identityFraudData = [
    { category: 'Traditional ID Fraud', value: 3.8 },
    { category: 'Digital ID Protection', value: 0.5 }
  ];

  const accessibilityData = [
    { region: 'Developed Countries', access: 75 },
    { region: 'Developing Countries', access: 35 },
    { region: 'Remote Areas', access: 15 }
  ];

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <div className="p-6 bg-black">
      <h1 className="text-2xl font-bold mb-6 text-white">Digital Passport Necessity Insights</h1>
      <div className="grid grid-cols-2 gap-6">
        <IdentityFraudChart data={identityFraudData} />
        <AccessibilityChart data={accessibilityData} colors={COLORS} />
      </div>
    </div>
  );
};

export default DigitalPassportStats;
