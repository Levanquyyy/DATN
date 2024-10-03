import { useSearchParams } from "react-router-dom";
import CategoryPage1010 from "@/components/ui/categories1010.jsx";
import CategoryPage1020 from "@/components/ui/categories1020.jsx";
const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const getCategoryId = searchParams.get("category");
  if (getCategoryId === "1010") {
    return <CategoryPage1010 />;
  } else if (getCategoryId === "1020") {
    return <CategoryPage1020 />;
  }
  return <div>Category not found</div>;
};
export default CategoryPage;
