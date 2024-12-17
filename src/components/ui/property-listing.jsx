import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PropertyListingSkeleton } from './PropertyListingSkeleton';

export default function PropertyListings({ dataFromServer = [] }) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = Math.ceil(dataFromServer.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataFromServer.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Simulate loading delay when changing pages
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-1">
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <PropertyListingSkeleton key={index} />
            ))
          : currentItems.map((item) => {
              const firstImageUrl = item.images[0];
              return (
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
                    <div className="flex flex-col md:flex-row md:h-[300px]">
                      <CardHeader className="relative p-0 md:w-2/5 lg:w-1/3">
                        <img
                          src={firstImageUrl}
                          alt="Property"
                          className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                          loading="lazy"
                        />
                        {item.type_posting_id === 4 && (
                          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                            VIP
                          </Badge>
                        )}
                      </CardHeader>
                      <div className="flex flex-col md:w-3/5 lg:w-2/3 p-4 md:p-6 justify-between">
                        <div>
                          <CardTitle
                            className={`text-xl mb-3 ${
                              item.type_posting_id === 4 ? 'text-primary' : ''
                            }`}
                          >
                            {item.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{item.land_area} m²</span>
                          </div>
                          <p className="font-semibold mb-3 text-lg">
                            Giá: {item.cost} VNĐ
                          </p>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                            {item.content}
                          </p>
                          <p
                            className={`text-sm ${
                              item.type_posting_id === 4
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`}
                          >
                            Người đăng: {item.user_name}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          {item.type_posting_id === 4 ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center space-x-1 text-primary">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Tin VIP - Ưu tiên hiển thị</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <div className="flex-grow" />
                          )}
                          <Button variant="outline" className="ml-auto">
                            Xem chi tiết <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
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
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
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
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
