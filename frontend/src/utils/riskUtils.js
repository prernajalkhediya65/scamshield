/**
 * Risk Utilities for ScamShield AI
 * Standardizes risk level classification and computes normalized risk scores (0 - 100).
 */

export function normalizeRiskLevel(rawLevel) {
  const norm = String(rawLevel || '').toUpperCase();
  if (norm === 'LOW' || norm === 'SAFE' || norm.includes('SAFE') || norm.includes('CLEAN')) {
    return 'SAFE';
  }
  if (norm === 'HIGH' || norm === 'DANGEROUS' || norm.includes('DANGER') || norm.includes('SCAM') || norm.includes('MALICIOUS')) {
    return 'DANGEROUS';
  }
  return 'SUSPICIOUS';
}

export function computeRiskScore(rawLevel, reasons = []) {
  const category = normalizeRiskLevel(rawLevel);
  const count = Array.isArray(reasons) ? reasons.length : 0;

  if (category === 'SAFE') {
    // Score between 5 and 20
    return Math.max(5, 15 - count * 2);
  }

  if (category === 'SUSPICIOUS') {
    // Score between 35 and 68
    return Math.min(68, 45 + count * 6);
  }

  // DANGEROUS: Score between 78 and 98
  return Math.min(98, 82 + count * 4);
}

export function getRiskScoreExplanation(score) {
  if (score <= 25) {
    return {
      category: 'SAFE',
      summary: 'Verified Low Threat',
      detail: 'No fraudulent indicators, suspicious domain spoofing, or extortion triggers were identified.',
      color: '#059669',
      bgColor: 'bg-emerald-50',
      textColor: 'text-[#059669]',
      borderColor: 'border-emerald-200',
    };
  }

  if (score <= 70) {
    return {
      category: 'SUSPICIOUS',
      summary: 'Moderate Threat Potential',
      detail: 'Contains irregular urgency, unverified identity claims, or deceptive patterns. Proceed with strict caution.',
      color: '#D97706',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
    };
  }

  return {
    category: 'DANGEROUS',
    summary: 'High-Risk Fraud / Phishing',
    detail: 'Verified malicious patterns, social engineering, credential harvesting, or financial fraud indicators detected.',
    color: '#DC2626',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
  };
}

