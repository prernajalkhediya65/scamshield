import React from 'react';
import { MessageSquare } from 'lucide-react';
import ScannerView from '../components/scanners/ScannerView';

export default function MessageScanner() {
  const examples = [
    {
      label: 'Lottery Scam',
      display: 'You won $50,000! Pay $499 fee...',
      value:
        'Congratulations! You have won $50,000 in a lucky draw. Your mobile number was selected. Click the link to claim within 24 hours. Pay a small processing fee of $499 to receive your reward.',
    },
    {
      label: 'Bank Urgency Alert',
      display: 'Your bank account will be blocked today...',
      value:
        'Dear Customer, Your SBI bank account will be blocked today due to pending KYC update. Click http://sbi-kyc-verify-portal.in to update your PAN and Aadhaar immediately.',
    },
    {
      label: 'WhatsApp Job Impersonation',
      display: 'Earn $300/day by liking YouTube videos...',
      value:
        'Hello! I am HR from Global Marketing Agency. We offer part-time remote work liking YouTube videos. Earn $300-$800 daily. Contact our Telegram manager @task_payout to start right now.',
    },
    {
      label: 'Normal Text',
      display: 'Hey, are we still meeting for lunch at 1pm?',
      value: 'Hey, are we still meeting for lunch today at 1pm? Let me know!',
    },
  ];

  const validateMessage = (value) => {
    if (value.trim().length < 5) {
      return 'Please enter a message of at least 5 characters to analyze.';
    }
    return null;
  };

  return (
    <ScannerView
      type="MESSAGE"
      title="AI Message Scanner"
      subtitle="Analyze SMS, WhatsApp, Telegram, or email text for social engineering, urgency tactics, and fraud."
      icon={MessageSquare}
      inputLabel="Paste Message Text"
      placeholder="Paste the suspicious SMS, WhatsApp message, or email here..."
      helperText="Never submit actual one-time passwords (OTPs), bank PINs, or private passwords. Our AI detects linguistic urgency and financial coercion."
      advisoryNote="Privacy & Threat Assurance: Content is scrutinized strictly for fraud patterns, phishing cues, and psychological manipulation triggers."
      isMultiline={true}
      examples={examples}
      validate={validateMessage}
    />
  );
}
