import Header from '@/components/products/header';
import { useGetProductByIdQuery } from '@/lib/store/api';

const EditProduct = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetProductByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;
  

  return (
    <div>
      <Header title={'Edit Product'} btnText={'Edit'} />
      <ProductForm defaultValue={data} />
    </div>
  );
};

export default EditProduct;
