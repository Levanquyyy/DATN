import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Star,
  MapPin,
  ArrowRight,
  Home,
  BedDouble,
  Bath,
  Timer,
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { PropertyListingSkeleton } from './PropertyListingSkeleton';
import { getDataNextPage } from '@/routes/apiforRentHouse.jsx';

export default function PropertyListings({ initialDataFromServer }) {
  const [dataFromServer, setDataFromServer] = useState(initialDataFromServer);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { data: listings = [], last_page = 1, total = 0 } = dataFromServer;
  const totalPages = Math.ceil(total / (listings.length || 1));
  useEffect(() => {
    setDataFromServer(initialDataFromServer);
  }, [initialDataFromServer]);

  const handlePageChange = useCallback(
    async (page) => {
      setCurrentPage(page);
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        const response = await getDataNextPage(dataFromServer.next_page_url);
        setDataFromServer(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [dataFromServer.next_page_url]
  );

  const renderListingCard = useCallback(
    (item) => (
      <Link
        key={item.id}
        to={`/detailproduct?nhadat=true&id=${item.id}`}
        className="block"
      >
        <Card
          className={`h-full transition-all hover:shadow-lg ${
            item.type_posting_id === 4
              ? 'border-primary shadow-primary/20'
              : 'hover:border-primary/50'
          }`}
        >
          <div className="flex h-full">
            <CardHeader className="relative p-0">
              <img
                src={item.images[0] || '/placeholder.svg'}
                alt="Property"
                className="w-full h-64 object-contain rounded-t-lg"
                loading="lazy"
              />
              {item.type_posting_id === 4 && (
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  VIP
                </Badge>
              )}
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle
                className={`text-xl mb-3 line-clamp-2 ${
                  item.type_posting_id === 4 ? 'text-primary' : ''
                }`}
              >
                {item.title}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>{item.address || 'Address not available'}</span>
              </div>
              <p className="font-semibold mb-3 text-lg">{item.cost} VNĐ</p>
              <div className="flex gap-3 text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  <span>{item.land_area} m²</span>
                </div>
                <div className="flex items-center">
                  <BedDouble className="w-4 h-4 mr-1" />
                  <span>{item.bedroom_id} phòng ngủ</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span>{item.bathroom_id} phòng tắm</span>
                </div>
              </div>
              <div className="flex mb-2 items-center">
                <Timer className="w-4 h-4 mr-1" />
                <span>Đã đăng: {item.created_at2}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3 font-bold">
                Tiêu đề: {item.content}
              </p>
              <div className="flex items-center gap-4 justify-end">
                <p
                  className={`text-sm ${
                    item.type_posting_id === 4
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.user_name}
                </p>
                {item.type_posting_id === 4 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 text-primary">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tin VIP - Ưu tiên hiển thị</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <Button variant="outline" size="sm">
                  Chi tiết <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    ),
    []
  );

  if (listings.length === 0 && !isLoading) {
    return <p className="text-center text-gray-500">No listings available.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-1">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <PropertyListingSkeleton key={index} />
            ))
          : listings.map(renderListingCard)}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (dataFromServer.prev_page_url) {
                    handlePageChange(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              if (pageNumber <= totalPages) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNumber);
                      }}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    currentPage < totalPages &&
                    dataFromServer.next_page_url
                  ) {
                    handlePageChange(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
