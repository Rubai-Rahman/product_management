'use client';
import ProductDetailsPage from '@/components/products/product-details';
import { useGetProductByIdQuery } from '@/lib/store/api';

const ProductPageContent = ({ slug }: { slug: string }) => {
  console.log('slug', slug);
  const { data, isLoading, error } = useGetProductByIdQuery(slug);
  console.log(
    'Single Product data',
    data,
    'isLoading',
    isLoading,
    'error',
    error
  );
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;
  return (
    <div>
      <ProductDetailsPage product={data} />
    </div>
  );
};
export default ProductPageContent;
