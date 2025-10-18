import type { Metadata } from 'next';
import ProductsPageContent from './page-products';

export const metadata: Metadata = {
  title: 'Products',
};
const ProductsPage = () => {
  return <ProductsPageContent />;
};
export default ProductsPage;
