import { useSearchParams } from "react-router-dom";
import CategoryPage1010 from "@/components/ui/categories1010.jsx";
import CategoryPage1020 from "@/components/ui/categories1020.jsx";
import CategoryPage1060 from "@/components/ui/categories1060.jsx";
import CategoryPage1070 from "@/components/ui/categories1070.jsx";
import CategoryPage1080 from "@/components/ui/categories1080.jsx";
const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const getCategoryId = searchParams.get("category");
  if (getCategoryId === "1010") {
    return <CategoryPage1010 />;
  } else if (getCategoryId === "1020") {
    return <CategoryPage1020 />;
  } else if (getCategoryId === "1060") {
    return <CategoryPage1060 />;
  } else if (getCategoryId === "1070") {
    return <CategoryPage1070 />;
  } else if (getCategoryId === "1080") {
    return <CategoryPage1080 />;
  }

  return <div>Category not found</div>;
};
export default CategoryPage;
