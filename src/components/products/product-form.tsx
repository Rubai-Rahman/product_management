'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/_types/products';

interface ProductFormProps {
  mode: 'create' | 'edit';
  initialProduct?: Product;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  category?: string;
}

export default function ProductForm({
  mode,
  initialProduct,
}: ProductFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: initialProduct?.name || '',
    description: initialProduct?.description || '',
    price: initialProduct?.price.toString() || '',
    category: initialProduct?.category || '',
  });

  return (
    <>
      <Link href="/products" className="inline-block mb-6">
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>
            {mode === 'create' ? 'Create New Product' : 'Edit Product'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Product Name *
              </label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                className={errors.name ? 'border-destructive' : ''}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-foreground"
              >
                Description *
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description)
                    setErrors({ ...errors, description: undefined });
                }}
                className={`w-full px-3 py-2 border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.description ? 'border-destructive' : 'border-border'
                }`}
                rows={4}
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium text-foreground"
              >
                Price (USD) *
              </label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                  if (errors.price) setErrors({ ...errors, price: undefined });
                }}
                className={errors.price ? 'border-destructive' : ''}
                disabled={isLoading}
              />
              {errors.price && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.price}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-foreground"
              >
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                  if (errors.category)
                    setErrors({ ...errors, category: undefined });
                }}
                className={`w-full px-3 py-2 border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.category ? 'border-destructive' : 'border-border'
                }`}
                disabled={isLoading}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Link href="/products" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading
                  ? `${mode === 'create' ? 'Creating' : 'Updating'}...`
                  : mode === 'create'
                  ? 'Create Product'
                  : 'Update Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
