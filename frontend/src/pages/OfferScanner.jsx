import React from 'react';
import { Tag } from 'lucide-react';
import ScannerView from '../components/scanners/ScannerView';

export default function OfferScanner() {
  const examples = [
    {
      label: 'Fake Work-From-Home',
      display: 'Earn $500/day by liking YouTube videos...',
      value:
        'Part-time remote job offer! Earn $300-$800 daily by simply liking YouTube videos and following TikTok accounts. No experience required. Deposit $50 refundable security fee to activate your VIP task wallet.',
    },
    {
      label: 'Unrealistic Discount',
      display: 'iPhone 16 Pro Max for $99 flash sale...',
      value:
        'MEGA CLEARANCE SALE: Brand new Apple iPhone 16 Pro Max 256GB for only $99! Only 10 units left in stock. Pay via Western Union or Crypto within 10 minutes to secure shipping.',
    },
    {
      label: 'Legitimate Promo',
      display: 'Official Steam Summer Sale 20% off...',
      value:
        'Steam Summer Sale is live! Get 20% off selected strategy titles until July 15 on store.steampowered.com.',
    },
  ];

  const validateOffer = (value) => {
    if (value.trim().length < 5) {
      return 'Please provide more offer details (at least 5 characters).';
    }
    return null;
  };

  return (
    <ScannerView
      type="OFFER"
      title="Fake Offer Detector"
      subtitle="Detect deceptive e-commerce sales, advance-fee crypto schemes, and fraudulent work-from-home tasks."
      icon={Tag}
      inputLabel="Paste Offer or Job Description"
      placeholder="Describe or paste the online deal, discount coupon, or job offer here..."
      helperText="Include promised payouts, payment instructions, or domain links if mentioned in the advertisement."
      isMultiline={true}
      examples={examples}
      validate={validateOffer}
    />
  );
}

