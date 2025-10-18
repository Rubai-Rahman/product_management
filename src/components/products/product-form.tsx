'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Plus, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { Product, category } from '@/lib/_types/products';
import { productSchema, ProductFormData } from '@/lib/schemas/product';
import { useEffect } from 'react';
import Image from 'next/image';

interface ProductFormProps {
  mode: 'create' | 'edit';
  initialProduct?: Product;
  categories: category[];
  categoriesLoading: boolean;
  isLoading: boolean;
  onSubmit: (data: ProductFormData) => void;
}

export default function ProductForm({
  mode,
  initialProduct,
  categories,
  categoriesLoading,
  isLoading,
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialProduct?.name || '',
      description: initialProduct?.description || '',
      price: initialProduct?.price || 0,
      categoryId: initialProduct?.category?.id || '',
      images: initialProduct?.images || [''],
    },
  });

  const watchedImages = watch('images') || [''];

  useEffect(() => {
    if (initialProduct && mode === 'edit') {
      setValue('name', initialProduct.name);
      setValue('description', initialProduct.description);
      setValue('price', initialProduct.price);
      setValue('categoryId', initialProduct.category?.id || '');
      setValue(
        'images',
        initialProduct.images?.length ? initialProduct.images : ['']
      );
    }
  }, [initialProduct, mode, setValue]);

  const handleAddImage = () => {
    const currentImages = watchedImages || [''];
    if (currentImages.length < 5) {
      setValue('images', [...currentImages, '']);
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = watchedImages || [''];
    if (currentImages.length > 1) {
      const newImages = currentImages.filter((_, i) => i !== index);
      setValue('images', newImages);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
        <CardHeader className="space-y-1 pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {mode === 'create' ? 'Create New Product' : 'Edit Product'}
          </CardTitle>
          <p className="text-muted-foreground">
            {mode === 'create'
              ? 'Fill in the details below to create a new product'
              : 'Update the product information below'}
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Product Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                Product Name
                <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                placeholder="Enter product name"
                {...register('name')}
                className={`transition-all duration-200 ${
                  errors.name
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                    : 'focus:border-primary focus:ring-primary/20'
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                Description
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                {...register('description')}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                  errors.description
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                    : 'border-input focus:border-primary focus:ring-primary/20'
                }`}
                rows={4}
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                Price (USD)
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  {...register('price', { valueAsNumber: true })}
                  className={`pl-8 transition-all duration-200 ${
                    errors.price
                      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                      : 'focus:border-primary focus:ring-primary/20'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.price && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="categoryId"
                className="text-sm font-medium text-foreground flex items-center gap-2"
              >
                Category
                <span className="text-red-500">*</span>
              </label>
              <select
                id="categoryId"
                {...register('categoryId')}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.categoryId
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                    : 'border-input focus:border-primary focus:ring-primary/20'
                }`}
                disabled={isLoading || categoriesLoading}
              >
                <option value="">
                  {categoriesLoading
                    ? 'Loading categories...'
                    : 'Select a category'}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Images */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  Product Images
                  <span className="text-red-500">*</span>
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddImage}
                  disabled={isLoading || watchedImages.length >= 5}
                  className="gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </Button>
              </div>

              <div className="space-y-3">
                {watchedImages.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Enter image URL"
                          {...register(`images.${index}` as const)}
                          className={`pl-10 transition-all duration-200 ${
                            errors.images?.[index]
                              ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                              : 'focus:border-primary focus:ring-primary/20'
                          }`}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.images?.[index] && (
                        <p className="text-sm text-destructive flex items-center gap-1 mt-1 animate-in slide-in-from-left-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.images[index]?.message}
                        </p>
                      )}
                    </div>

                    {watchedImages.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                        disabled={isLoading}
                        className="px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {errors.images && typeof errors.images.message === 'string' && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.images.message}
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Add up to 5 image URLs. The first image will be used as the main
                product image.
              </p>
            </div>

            {/* Image Preview */}
            {watchedImages &&
              watchedImages.some((img) => img && img.trim()) && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Image Preview
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {watchedImages
                      .filter((img) => img && img.trim())
                      .slice(0, 3)
                      .map((imageUrl, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/50"
                        >
                          <Image
                            height={200}
                            width={200}
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            unoptimized
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
              <Link href="/products" className="w-full sm:flex-1">
                <Button
                  variant="outline"
                  className="w-full transition-all duration-200 hover:bg-muted/50"
                  disabled={isLoading}
                  type="button"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="w-full sm:flex-1 bg-gradient-to-r from-primary to-accent hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:scale-105"
                disabled={isLoading}
              >
                {mode === 'create' ? 'Create Product' : 'Update Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
