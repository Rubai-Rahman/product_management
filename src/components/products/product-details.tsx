'use client';

import { Product } from '@/lib/_types/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Calendar,
  Package,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useDeleteProductMutation } from '@/lib/store/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

interface ProductDetailsPageProps {
  product: Product;
}

export default function ProductDetailsPage({
  product,
}: ProductDetailsPageProps) {
  const router = useRouter();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id).unwrap();
      toast.success('Product deleted successfully!');
      router.push('/products');
    } catch {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/products">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Products
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Product Details
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/products/edit/${product.id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &quot;{product.name}
                      &quot;? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-6">
                <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={600}
                      height={600}
                      unoptimized
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-center">
                      <Package className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No image available
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional Images */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {product.images.slice(1, 5).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-muted"
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 2}`}
                          width={150}
                          height={150}
                          unoptimized
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {product.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20">
                    {product.category?.name || 'Uncategorized'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <span className="text-3xl font-bold text-accent">
                    ${product.price?.toFixed(2) || '0.00'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Created
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(product.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Last Updated
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(product.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Product ID
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {product.id}
                    </p>
                  </div>
                </div>

                {product.slug && (
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Slug
                      </p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {product.slug}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
