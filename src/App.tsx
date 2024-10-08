import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/components/Layout";
import Auth from "./pages/auth";
import HomePage from "./pages/home";
import CategoryPage from "./pages/categories/[categoryId]";
import ReviewPage from "./pages/preview/[preview].jsx";
import PostPage from "./pages/post/[postpage].jsx";
import PaidPage from "./pages/paid/[paid].jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
