export const PLANS = [
  {
    name: 'Basic Protection',
    premium: 49,
    basePremium: 30,
    riskAdjustment: 19,
    coverage: 2000,
    payout: 100,
    maxHours: 20,
    risk: 'Low',
    features: ['Weather protection', 'Basic fraud detection', 'Email support'],
    riskScores: { weather: 45, safety: 40, pollution: 30, traffic: 35 },
    totalScore: 38
  },
  {
    name: 'Standard Shield',
    premium: 75,
    basePremium: 40,
    riskAdjustment: 35,
    coverage: 3000,
    payout: 150,
    maxHours: 20,
    risk: 'Medium',
    recommended: true,
    features: ['All weather events', 'Pollution alerts', 'Advanced fraud detection', 'Priority support', 'Instant payouts'],
    riskScores: { weather: 65, safety: 75, pollution: 45, traffic: 55 },
    totalScore: 60
  },
  {
    name: 'Premium Guard',
    premium: 120,
    basePremium: 60,
    riskAdjustment: 60,
    coverage: 5000,
    payout: 250,
    maxHours: 20,
    risk: 'High',
    features: ['Complete coverage', 'All disruptions', 'Premium fraud detection', '24/7 support', 'Instant payouts', 'Bonus protection'],
    riskScores: { weather: 85, safety: 90, pollution: 70, traffic: 80 },
    totalScore: 82
  }
];
