'use client';

import Header from '@/components/products/header';
import ProductTable from '@/components/products/products-table';
import Searchbar from '@/components/products/searchbar';
import { useGetProductsQuery } from '@/lib/store/api';

const ProductsPageContent = () => {
  const { data, isLoading, error } = useGetProductsQuery({
    offset: 200,
    limit: 10,
  });
  console.log('data', data, '......');
  return (
    <div>
      <div>
        <Header />
        <Searchbar/>
      </div>
      <ProductTable products={data || []} onDelete={() => {}} />
    </div>
  );
};

export default ProductsPageContent;
