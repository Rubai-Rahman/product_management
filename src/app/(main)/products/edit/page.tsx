import EditProduct from './page-edit';

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <EditProduct id={id} />;
};

export default EditProductPage;
