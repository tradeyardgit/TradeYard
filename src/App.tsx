import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthHandler from './components/auth/AuthHandler';
import PublicLayout from './components/layout/PublicLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AdDetailPage from './pages/AdDetailPage';
import PostAdPage from './pages/PostAdPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import FAQsPage from './pages/FAQsPage';
import SafetyTipsPage from './pages/SafetyTipsPage';
import FavoritesPage from './pages/FavoritesPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import FeaturedAdsListingPage from './pages/FeaturedAdsListingPage';
import RecentAdsListingPage from './pages/RecentAdsListingPage';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import UsersPage from './pages/admin/UsersPage';
import ListingsPage from './pages/admin/ListingsPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <Router>
      <AuthHandler>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="category/:categoryId" element={<CategoryPage />} />
            <Route path="ads/:adId" element={<AdDetailPage />} />
            <Route path="post-ad" element={<PostAdPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="faqs" element={<FAQsPage />} />
            <Route path="safety-tips" element={<SafetyTipsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="featured" element={<FeaturedAdsListingPage />} />
            <Route path="recent" element={<RecentAdsListingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthHandler>
    </Router>
  );
}

export default App;