import React from 'react';
import { Phone } from 'lucide-react';
import ScannerView from '../components/scanners/ScannerView';

export default function PhoneScanner() {
  const examples = [
    {
      label: 'Toll-Free Tech Support Scam',
      display: '+1 (888) 555-0199',
      value: '+1 (888) 555-0199',
    },
    {
      label: 'Wangiri One-Ring Callback',
      display: '+232 21 555 123',
      value: '+232 21 555 123',
    },
    {
      label: 'Unverified Mobile Posing as Bank',
      display: '+91 98765 43210',
      value: '+91 98765 43210',
    },
    {
      label: 'Official Support Helpline',
      display: '1-800-275-2273',
      value: '1-800-275-2273',
    },
  ];

  const validatePhone = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      return 'Please enter a valid phone number with at least 7 digits.';
    }
    if (!/^[+\d\s\-()]+$/.test(value)) {
      return 'Phone number contains invalid characters. Use numbers, +, -, and parentheses.';
    }
    return null;
  };

  return (
    <ScannerView
      type="PHONE"
      apiType="MESSAGE"
      formatPayload={(val) =>
        `[Phone Number]: ${val} (Analyze this phone number for caller ID spoofing indicators, toll-free callback traps, premium-rate Wangiri risk, and telecom scam tactics)`
      }
      title="Fraud Phone Number Detection"
      subtitle="Identify suspicious phone numbers, caller ID spoofing vulnerabilities, and known callback scam patterns."
      icon={Phone}
      inputLabel="Enter Phone Number"
      placeholder="+1 (888) 555-0199 or 9876543210"
      helperText="Include country code (+1, +44, +91) for the most accurate international routing and tariff analysis."
      advisoryNote="Cybersecurity Notice: Threat assessment evaluates area code profiles, VoIP indicators, toll-free callback traps, and social engineering patterns associated with robocalls. ScamShield AI does not use fake or synthetic carrier databases."
      isMultiline={false}
      examples={examples}
      validate={validatePhone}
    />
  );
}

