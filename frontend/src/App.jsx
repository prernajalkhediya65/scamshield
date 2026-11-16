import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Enterprise Threat Dashboard (Protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout title="Dashboard">
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Dedicated Scanners (Protected) */}
          <Route
            path="/scanner/url"
            element={
              <ProtectedRoute>
                <AppLayout title="URL Scanner">
                  <UrlScanner />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/scanner/message"
            element={
              <ProtectedRoute>
                <AppLayout title="Message Scanner">
                  <MessageScanner />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/scanner/phone"
            element={
              <ProtectedRoute>
                <AppLayout title="Phone Scanner">
                  <PhoneScanner />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/scanner/offer"
            element={
              <ProtectedRoute>
                <AppLayout title="Offer Detector">
                  <OfferScanner />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Audit Log, Telemetry Analytics & Settings (Protected) */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <AppLayout title="Scan History">
                  <ScanHistory />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AppLayout title="Analytics">
                  <Analytics />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AppLayout title="Settings">
                  <Settings />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
