
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoadingSkeleton from './components/LoadingSkeleton';
import ScrollToTop from './components/ScrollToTop';
import { MockDB } from './services/mockDb';

// Public Pages
const HomePage = lazy(() => import('./pages/Public/HomePage'));
const CategoriesPage = lazy(() => import('./pages/Public/CategoriesPage'));
const StoreDetailPage = lazy(() => import('./pages/Public/StoreDetailPage'));
const SearchResultsPage = lazy(() => import('./pages/Public/SearchResultsPage'));
const BlogListPage = lazy(() => import('./pages/Public/BlogListPage'));
const BlogDetailPage = lazy(() => import('./pages/Public/BlogDetailPage'));
const ContactPage = lazy(() => import('./pages/Public/ContactPage'));
const SubmitDealPage = lazy(() => import('./pages/Public/SubmitDealPage'));
const AboutPage = lazy(() => import('./pages/Public/AboutPage'));
const LegalPage = lazy(() => import('./pages/Public/LegalPage'));

// Auth Pages
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/Auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/Auth/ForgotPasswordPage'));

// Admin Pages
const AdminLayout = lazy(() => import('./components/Admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminUserManagement = lazy(() => import('./pages/Admin/AdminUserManagement'));
const AdminAnalytics = lazy(() => import('./pages/Admin/AdminAnalytics'));
const AdminEditor = lazy(() => import('./pages/Admin/AdminEditor'));
const AdminCouponCreator = lazy(() => import('./pages/Admin/AdminCouponCreator'));
const AdminCouponManagement = lazy(() => import('./pages/Admin/AdminCouponManagement'));
const AdminMediaLibrary = lazy(() => import('./pages/Admin/AdminMediaLibrary'));
const AdminSettings = lazy(() => import('./pages/Admin/AdminSettings'));
const AdminStoreManagement = lazy(() => import('./pages/Admin/AdminStoreManagement'));
const AdminCategoryManagement = lazy(() => import('./pages/Admin/AdminCategoryManagement'));
const AdminPostManagement = lazy(() => import('./pages/Admin/AdminPostManagement'));
const AdminMenuManagement = lazy(() => import('./pages/Admin/AdminMenuManagement'));

// Misc
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Component bảo vệ Route
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoggedIn = MockDB.isLoggedIn();
  const isAdmin = MockDB.isAdmin();

  if (!isLoggedIn) {
    // Lưu lại trang đang muốn vào để sau khi login quay lại
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // Nếu login rồi nhưng không phải admin thì đẩy về home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      await MockDB.init();
      setIsLoaded(true);
    };
    initApp();
  }, []);

  if (!isLoaded) return <LoadingSkeleton />;

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/store/:id" element={<StoreDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/submit-deal" element={<SubmitDealPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/legal" element={<LegalPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Admin Routes - Bọc trong ProtectedRoute */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="stores" element={<AdminStoreManagement />} />
            <Route path="categories" element={<AdminCategoryManagement />} />
            <Route path="coupons" element={<AdminCouponManagement />} />
            <Route path="coupons/new" element={<AdminCouponCreator />} />
            <Route path="coupons/edit/:id" element={<AdminCouponCreator />} />
            <Route path="posts" element={<AdminPostManagement />} />
            <Route path="menu" element={<AdminMenuManagement />} />
            <Route path="editor" element={<AdminEditor />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="media" element={<AdminMediaLibrary />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Route */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
