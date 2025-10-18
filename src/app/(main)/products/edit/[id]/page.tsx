import EditProduct from '../page-edit';

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log('EditProductPage - extracted ID from params:', id);
  console.log('EditProductPage - params object:', await params);
  return <EditProduct id={id} />;
};

export default EditProductPage;
