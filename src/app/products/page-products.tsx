'use client';

import ProductTable from '@/components/products/products-table';
import { useGetProductsQuery } from '@/lib/store/api';

const ProductsPageContent = () => {
  const { data, isLoading, error } = useGetProductsQuery({
    offset: 100,
    limit: 10,
  });
  console.log('data', data, '......');
  return (
    <div>
      <ProductTable products={data || []} onDelete={() => {}} />
    </div>
  );
};

export default ProductsPageContent;
