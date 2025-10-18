'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  useGetCategoriesQuery,
  useSearchCategoriesQuery,
} from '@/lib/store/api';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Search,
  Package,
  Calendar,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Use search query if available, otherwise get all categories
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useGetCategoriesQuery(
    { offset, limit: itemsPerPage },
    { skip: !!debouncedSearchQuery }
  );

  const {
    data: searchResults = [],
    isLoading: isSearching,
    error: searchError,
  } = useSearchCategoriesQuery(debouncedSearchQuery, {
    skip: !debouncedSearchQuery,
  });

  const displayCategories = debouncedSearchQuery ? searchResults : categories;
  const isLoading = isLoadingCategories || isSearching;
  const error = categoriesError || searchError;

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleClear = () => {
    setSearchQuery('');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/products">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                  </Button>
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Categories
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8">
            <CardContent className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-red-600 mb-2">
                Error Loading Categories
              </h2>
              <p className="text-muted-foreground">
                There was an error loading the categories. Please try again.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100  ">
      {/* Header */}
      <div className="bg-white  border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/products">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Products
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Categories
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-10 bg-background border-input focus:border-blue-500 focus:ring-blue-200 transition-all duration-200"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    ×
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {searchQuery && <span>Showing results for {searchQuery}</span>}
              {!searchQuery && (
                <span>{displayCategories.length} categories</span>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="p-8">
            <CardContent className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-lg">Loading categories...</span>
            </CardContent>
          </Card>
        )}

        {/* Categories Grid */}
        {!isLoading && (
          <>
            {displayCategories.length === 0 ? (
              <Card className="p-12">
                <CardContent className="text-center">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {searchQuery
                      ? 'No Categories Found'
                      : 'No Categories Available'}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? `No categories match "${searchQuery}". Try a different search term.`
                      : 'There are no categories available at the moment.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <CardHeader className="pb-3">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-3">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.name}
                            width={200}
                            height={200}
                            unoptimized
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Package className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {category.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(category.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination for non-search results */}
            {!searchQuery && displayCategories.length > 0 && (
              <div className="mt-8 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {displayCategories.length} categories
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="gap-1"
                  >
                    Previous
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md">
                    {currentPage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={displayCategories.length < itemsPerPage}
                    className="gap-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
