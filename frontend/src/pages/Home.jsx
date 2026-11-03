import React from 'react';
import HomeNavbar from '../components/home/HomeNavbar';
import HeroSection from '../components/home/HeroSection';
import FeatureGrid from '../components/home/FeatureGrid';
import HowItWorks from '../components/home/HowItWorks';
import SecurityBenefits from '../components/home/SecurityBenefits';
import HomeCtaBanner from '../components/home/HomeCtaBanner';
import HomeFooter from '../components/home/HomeFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172B24] flex flex-col font-sans">
      {/* Sticky Navigation */}
      <HomeNavbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Call to Action & Sample Inspection Preview */}
        <HeroSection />

        {/* 2. Feature Grid across Modalities (URL, Message, Phone, Offer) */}
        <FeatureGrid />

        {/* 3. How It Works - 3-step structured scanning methodology */}
        <HowItWorks />

        {/* 4. Security, Accuracy & Privacy Benefits */}
        <SecurityBenefits />

        {/* 5. Closing Call to Action Banner */}
        <HomeCtaBanner />
      </main>

      {/* Professional Footer */}
      <HomeFooter />
    </div>
  );
}

