import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import UrlScanner from './pages/UrlScanner';
import MessageScanner from './pages/MessageScanner';
import PhoneScanner from './pages/PhoneScanner';
import OfferScanner from './pages/OfferScanner';
import ScanHistory from './pages/ScanHistory';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout title="Dashboard">
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Navigate to="/" replace />
          }
        />
        <Route
          path="/scanner/url"
          element={
            <AppLayout title="URL Scanner">
              <UrlScanner />
            </AppLayout>
          }
        />
        <Route
          path="/scanner/message"
          element={
            <AppLayout title="Message Scanner">
              <MessageScanner />
            </AppLayout>
          }
        />
        <Route
          path="/scanner/phone"
          element={
            <AppLayout title="Phone Scanner">
              <PhoneScanner />
            </AppLayout>
          }
        />
        <Route
          path="/scanner/offer"
          element={
            <AppLayout title="Offer Detector">
              <OfferScanner />
            </AppLayout>
          }
        />
        <Route
          path="/history"
          element={
            <AppLayout title="Scan History">
              <ScanHistory />
            </AppLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <AppLayout title="Analytics">
              <Analytics />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout title="Settings">
              <Settings />
            </AppLayout>
          }
        />
        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
