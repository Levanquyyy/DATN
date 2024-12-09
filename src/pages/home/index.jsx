import { Link } from 'react-router-dom';
import { Clock, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header.tsx';
const items = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    text: 'Bất động sản',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    text: 'Xe cộ',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    text: 'Đồ điện tử',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    text: 'Đồ gia dụng, nội thất, cây cảnh',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    text: 'Giải trí, Thể thao, Sở thích',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    text: 'Mẹ và bé',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    text: 'Dịch vụ, Du lịch',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

const HomePage = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await sleep(1000); // 3 seconds delay
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                Khám phá danh mục
              </h1>
            </div>
            <div className="flex rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center gap-1 text-center w-full">
                <div className="container mx-auto px-4 py-8 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                    {items.map((item) => (
                      <SkeletonCard key={item.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                Tin đăng mới
              </h1>
            </div>
            <div className="flex rounded-lg border border-dashed shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto py-3">
                {Array(visibleCount)
                  .fill()
                  .map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const recipes = [
    {
      image:
        'https://i.pinimg.com/736x/98/af/c8/98afc8061960bdf71e1f16705ab63628.jpg',
      name: 'Spicy Chicken Stir-Fry',
      price: '34 triệu/tháng',
      time: '1 giờ trước',
      location: 'Hà Nội',
    },
    // ... other recipes
  ];

  const RecipeCard = ({ recipe }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <Link to="/detaipage?category=1010">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover"
            loading={'lazy'}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
            <p className="text-gray-600 mb-2">{recipe.price}</p>
            <div className="flex items-center mb-2">
              <Clock className="text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">{recipe.time}</span>
            </div>
            <div className="flex items-center mb-2"></div>
            <div className="mb-2">
              <h3 className="text-sm font-semibold mb-1">{recipe.location}</h3>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`cursor-pointer ${index < recipe.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={toggleFavorite}
                className={`${isFavorite ? 'text-red-500' : 'text-gray-400'} transition-colors duration-300`}
                aria-label={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                <div className="flex">
                  <Heart className="text-xl" />
                  <button
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    aria-label="Share recipe"
                  >
                    <Share2 className="text-xl" />
                  </button>
                </div>
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Khám phá danh mục
            </h1>
          </div>
          <div className="flex rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center w-full">
              <div className="container mx-auto px-4 py-8 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
                      tabIndex={0}
                    >
                      <div className="w-[84px] h-[84px] relative rounded-lg">
                        <Link to={`/product/${item.id}`}>
                          <img
                            loading={'lazy'}
                            src={item.image}
                            alt={`Item ${item.id}`}
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '';
                              e.target.className =
                                'w-full h-full flex items-center justify-center bg-gray-200';
                              e.target.parentNode.innerHTML = '';
                              const placeholder = document.createElement('div');
                              placeholder.className =
                                'w-full h-full flex items-center justify-center bg-gray-200';
                              const icon = document.createElement('div');
                              icon.className = 'text-gray-400 text-4xl';
                              icon.innerHTML = `<FaImage />`;
                              placeholder.appendChild(icon);
                              e.target.parentNode.appendChild(placeholder);
                            }}
                          />
                        </Link>
                      </div>
                      <p className="text-center p-4 text-gray-700 font-medium">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Tin đăng mới</h1>
          </div>
          <div className="flex rounded-lg border border-dashed shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto py-3">
              {recipes.slice(0, visibleCount).map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            {visibleCount < recipes.length && (
              <Button onClick={handleShowMore}>Xem Thêm</Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
