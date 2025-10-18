'use client';

import ProductDetailsPage from '@/components/products/product-details';
import { useGetProductByIdQuery } from '@/lib/store/api';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorState from '@/components/ui/error-state';
import { Card, CardContent } from '@/components/ui/card';

const ProductPageContent = ({ slug }: { slug: string }) => {
  const { data, isLoading, error, refetch } = useGetProductByIdQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded-full" />
            <span className="text-lg">Loading product...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="max-w-md">
          <ErrorState
            title="Product Not Found"
            message="The product you're looking for doesn't exist or has been removed."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return <ProductDetailsPage product={data} />;
};

export default ProductPageContent;
