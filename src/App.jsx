import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/components/Layout";
import Auth from "./pages/auth/index.jsx";
import HomePage from "./pages/home/index.jsx";
import CategoryPage from "./pages/categories/[categoryId].jsx";
import ReviewPage from "./pages/preview/[preview].jsx";
import PostPage from "./pages/post/[postpage].jsx";
import PaidPage from "./pages/paid/[paid].jsx";
import DetailPage from "./pages/detailproduct/[detailpage].jsx";
import NhatotPage from "./pages/nhatot/index.jsx";
import { useAppStore } from "./store/index.js";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const PrivateRoutes = ({ children }) => {
  const { userInfo } = useAppStore();
  const authenticated = !!userInfo;
  return authenticated ? children : <Navigate to="/auth" />;
};
const AuthRoutes = ({ children }) => {
  const { userInfo } = useAppStore();
  const authenticated = !!userInfo;
  return authenticated ? <Navigate to="/chat" /> : children;
};
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/dang-tin" element={<CategoryPage />} />
            <Route path="/preview" element={<ReviewPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/paid" element={<PaidPage />} />
            <Route path="/detaipage" element={<DetailPage />} />
            <Route path="/nhatot" element={<NhatotPage />} />

            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
