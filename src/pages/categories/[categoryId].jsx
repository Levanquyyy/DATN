import { useSearchParams } from 'react-router-dom';
import CategoryPage1010 from '@/components/ui/categories1010.jsx';
import CategoryPage1020 from '@/components/ui/categories1020.jsx';
import CategoryPage1060 from '@/components/ui/categories1060.jsx';

import CategoryPage1090 from '@/components/ui/categories1090.jsx';
import CategoryPage1100 from '@/components/ui/categories1100.jsx';

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const getCategoryId = searchParams.get('category');
  if (getCategoryId === '1010') {
    return <CategoryPage1010 />;
  } else if (getCategoryId === '1020') {
    return <CategoryPage1020 />;
  } else if (getCategoryId === '1060') {
    return <CategoryPage1060 />;
  } else if (getCategoryId === '1090') {
    return <CategoryPage1090 />;
  } else if (getCategoryId === '1100') {
    return <CategoryPage1100 />;
  }

  return <div>Category not found</div>;
};
export default CategoryPage;
