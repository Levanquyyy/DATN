import { ThemeProvider } from '@/components/theme-provider';
import Layout from '@/components/Layout';
import Auth from './pages/auth/index.jsx';
import HomePage from './pages/home/index.jsx';
import CategoryPage from './pages/categories/[categoryId].jsx';
import ReviewPage from './pages/preview/[preview].jsx';
import PostPage from './pages/post/[postpage].jsx';
import PaidPage from './pages/paid/[paid].jsx';
import DetailPage from './pages/detailproduct/[detailpage].jsx';
import NhatotPage from './pages/nhatot/index.jsx';
import BillPage from './pages/bill/[bill].jsx';
import Profile from './pages/profile/[profile].jsx';
import ForgotPasswordForm from './pages/forgot-password/forgot-password.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import ConfirmPasswordForm from '@/pages/confirm-password/confirm-password.jsx';
const AuthRoutes = ({ children }) => {
  const access_token = Cookies.get('access_token');

  // Kiểm tra token, nếu không có sẽ chuyển hướng về trang đăng nhập
  return access_token ? <Navigate to="/home-page" replace /> : children;
};
// Component PrivateRoute để bảo vệ các route cần đăng nhập

const PrivateRoute = ({ children }) => {
  const access_token = Cookies.get('access_token');

  // Kiểm tra token, nếu không có sẽ chuyển hướng về trang đăng nhập
  return access_token ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/auth"
              element={
                <AuthRoutes>
                  <Auth />
                </AuthRoutes>
              }
            />
            <Route
              path="/home-page"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dang-tin"
              element={
                <PrivateRoute>
                  <CategoryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/preview/:id"
              element={
                <PrivateRoute>
                  <ReviewPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <PrivateRoute>
                  <PostPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/paid"
              element={
                <PrivateRoute>
                  <PaidPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/detailproduct"
              element={
                <PrivateRoute>
                  <DetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/nhatot"
              element={
                <PrivateRoute>
                  <NhatotPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/myads"
              element={
                <PrivateRoute>
                  <BillPage />
                </PrivateRoute>
              }
            />{' '}
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/reset_password" element={<ForgotPasswordForm />} />
            <Route
              path="/confirm_reset_password/:id"
              element={<ConfirmPasswordForm />}
            />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
