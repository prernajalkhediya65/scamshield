import React from 'react';
import { Globe } from 'lucide-react';
import ScannerView from '../components/scanners/ScannerView';

export default function UrlScanner() {
  const examples = [
    {
      label: 'Phishing Link',
      display: 'https://secure-apple-id-verify.com/login',
      value: 'https://secure-apple-id-verify.com/login?token=urgent-account-lock',
    },
    {
      label: 'Fake Banking',
      display: 'http://hdfc-kyc-update-portal24.net',
      value: 'http://hdfc-kyc-update-portal24.net/pan-link-submit',
    },
    {
      label: 'Legitimate Site',
      display: 'https://github.com',
      value: 'https://github.com',
    },
  ];

  const validateUrl = (value) => {
    if (!/^https?:\/\//i.test(value)) {
      return 'Enter a valid URL starting with http:// or https://';
    }
    return null;
  };

  return (
    <ScannerView
      type="URL"
      title="Advanced URL Scanner"
      subtitle="Detect deceptive domains, typosquatting, credential harvesters, and malicious redirects."
      icon={Globe}
      inputLabel="Paste Website URL"
      placeholder="https://example.com/login"
      helperText="Enter the full link including http:// or https://. We analyze domain age indicators, spoofing patterns, and deceptive subdomains."
      advisoryNote="Verification Notice: Advanced heuristic analysis inspects URL structure and known phishing signatures. Even if marked SAFE, always verify the SSL padlock and domain spelling before submitting credentials or payments."
      isMultiline={false}
      examples={examples}
      validate={validateUrl}
    />
  );
}
