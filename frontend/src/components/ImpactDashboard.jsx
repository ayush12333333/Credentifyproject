import React from 'react';
import ImpactStatistics from './ImpactStatistics';
import SDGAlignment from './SDGAlignment';
import AdoptionTrendChart from './AdoptionTrendChart';
import { Shield, Lock, Globe, Check, Users } from 'lucide-react';

const ImpactDashboard = () => {
  // Impact Statistics
  const impactData = [
    { name: 'Identity Fraud Prevention', value: '85%', icon: <Shield color="#4CAF50" /> },
    { name: 'Data Privacy Protection', value: '95%', icon: <Lock color="#2196F3" /> },
    { name: 'Cross-Sector Verification', value: '78%', icon: <Globe color="#FF9800" /> }
  ];

  // SDG Alignment Data
  const sdgAlignment = [
    { goal: 'Gender Equality', description: 'Secure access for marginalized populations', icon: <Users color="#FF6B6B" /> },
    { goal: 'Reduced Inequalities', description: 'Digital identity for underserved communities', icon: <Check color="#4ECDC4" /> }
  ];

  // Technology Adoption Trend
  const trendData = [
    { year: '2022', adoption: 40 },
    { year: '2023', adoption: 65 },
    { year: '2024', adoption: 85 }
  ];

  return (
    <div className="p-6 bg-black">
      <h1 className="text-2xl font-bold mb-6 text-white">Credentify: Impact & Sustainable Development</h1>
      <ImpactStatistics impactData={impactData} />
      <SDGAlignment sdgAlignment={sdgAlignment} />
      <AdoptionTrendChart trendData={trendData} />
    </div>
  );
};

export default ImpactDashboard;
