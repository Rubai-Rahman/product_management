'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/products/header';
import ProductForm from '@/components/products/product-form';
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from '@/lib/store/api';
import { ProductFormData } from '@/lib/schemas/product';
import { toast } from 'sonner';

const CreateProduct = () => {
  const router = useRouter();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery({});

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        images: data.images.filter((img) => img.trim() !== ''), // Remove empty strings
      };

      await createProduct(productData).unwrap();
      toast.success('Product created successfully!');
      router.push('/products');
    } catch (error) {
      console.error('Create product error:', error);
      toast.error('Failed to create product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header title="Create Product" btnText="Back to Products" />
      <ProductForm
        mode="create"
        categories={categories}
        categoriesLoading={categoriesLoading}
        isLoading={isCreating}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateProduct;
