'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/products/header';
import ProductForm from '@/components/products/product-form';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} from '@/lib/store/api';
import { ProductFormData } from '@/lib/schemas/product';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ErrorState from '@/components/ui/error-state';
import { toast } from 'sonner';

const EditProduct = ({ id }: { id: string }) => {
  console.log('EditProduct received ID:', id);
  console.log('ID type:', typeof id);
  console.log('ID length:', id?.length);

  const router = useRouter();
  const {
    data: product,
    isLoading: productLoading,
    error,
    isError,
    isSuccess,
  } = useGetProductByIdQuery(id, {
    skip: !id || id.length === 0, // Skip the query if no valid ID
  });

  console.log('Query state:', {
    product,
    productLoading,
    error,
    isError,
    isSuccess,
    hasId: !!id,
  });
  console.log('Error details:', error);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery({});

  const handleSubmit = async (data: ProductFormData) => {
    if (!product) return;

    try {
      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        images: data.images.filter((img) => img.trim() !== ''), // Remove empty strings
      };

      await updateProduct({
        id: product.id,
        body: productData,
      }).unwrap();

      toast.success('Product updated successfully!');
      router.push('/products');
    } catch (error) {
      console.error('Update product error:', error);
      toast.error('Failed to update product');
    }
  };

  if (!id || productLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header title="Edit Product" btnText="Back to Products" />
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-8">
            <CardContent className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-lg">Loading product...</span>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!productLoading && (error || (!product && isError))) {
    console.log('Showing error state because:', {
      productLoading,
      error: !!error,
      noProduct: !product,
      isError,
    });
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header title="Edit Product" btnText="Back to Products" />
        <div className="flex items-center justify-center min-h-[400px]">
          <ErrorState
            title="Product Not Found"
            message="The product you're looking for doesn't exist or has been removed."
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header title="Edit Product" btnText="Back to Products" />
      <ProductForm
        mode="edit"
        initialProduct={product}
        categories={categories}
        categoriesLoading={categoriesLoading}
        isLoading={isUpdating}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditProduct;
