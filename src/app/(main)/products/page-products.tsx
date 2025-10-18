'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/products/header';
import ProductTable from '@/components/products/products-table';
import Searchbar from '@/components/products/searchbar';
import { Button } from '@/components/ui/button';
import ProductsSkeleton from '@/components/ui/products-skeleton';
import ErrorState from '@/components/ui/error-state';
import ResultNotFound from '@/components/ui/result-not-found';
import {
  useGetProductsQuery,
  useSearchProductsQuery,
  useDeleteProductMutation,
} from '@/lib/store/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const ProductsPageContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  // Use search query if available, otherwise get all products
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useGetProductsQuery(
    { offset, limit: itemsPerPage },
    { skip: !!searchQuery }
  );

  const {
    data: searchResults = [],
    isLoading: isSearching,
    error: searchError,
    refetch: refetchSearch,
  } = useSearchProductsQuery(searchQuery, { skip: !searchQuery });

  const [deleteProduct] = useDeleteProductMutation();

  const displayProducts = searchQuery ? searchResults : products;
  const isLoading = isLoadingProducts || isSearching;
  const error = productsError || searchError;
  const refetch = searchQuery ? refetchSearch : refetchProducts;

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted successfully!');
      // No need to manually refetch - RTK Query will auto-invalidate
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete product');
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (displayProducts.length === itemsPerPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header
          title="Products"
          btnText="Dashboard"
          showCreateButton
          showCategoriesButton
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState
            title="Error Loading Products"
            message="There was an error loading the products. Please try again."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header
        title="Products"
        btnText="Dashboard"
        showCreateButton
        showCategoriesButton
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <Searchbar
                onSearch={handleSearch}
                placeholder="Search products by name..."
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {searchQuery && (
                <span>Showing results for &quot;{searchQuery}&quot;</span>
              )}
              {!searchQuery && (
                <span>
                  Page {currentPage} • {displayProducts.length} products
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <ProductsSkeleton />}

        {/* Products Table */}
        {!isLoading && (
          <>
            <ProductTable
              products={displayProducts}
              onDelete={handleDelete}
              isLoading={isLoading}
            />

            {/* Pagination - only show for non-search results */}
            {!searchQuery && displayProducts.length > 0 && (
              <div className="mt-8 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {displayProducts.length} products
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-md">
                    {currentPage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={displayProducts.length < itemsPerPage}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Search Results Info */}
            {searchQuery && displayProducts.length === 0 && (
              <div className="mt-8">
                <ResultNotFound
                  message="No Products Found"
                  description={`No products match &quot;${searchQuery}&quot;. Try a different search term.`}
                  icon="search"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPageContent;
