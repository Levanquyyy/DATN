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
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppStore } from './store/index.js';
import { useEffect, useState } from 'react';

const AuthRoutes = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = Cookies.get('access_token');
    if (access_token) {
      setAuthenticated(true);
      navigate('/home-page');
    } else {
      setAuthenticated(false);
    }
  }, [navigate]);

  return authenticated ? <Navigate to="/home-page" /> : children;
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
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/dang-tin" element={<CategoryPage />} />
            <Route path="/preview" element={<ReviewPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/paid" element={<PaidPage />} />
            <Route path="/detaipage" element={<DetailPage />} />
            <Route path="/nhatot" element={<NhatotPage />} />
            <Route path="/myads" element={<BillPage />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
