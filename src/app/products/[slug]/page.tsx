import ProductPageContent from './page-product';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details',
};

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <ProductPageContent slug={slug} />;
};
export default ProductPage;
