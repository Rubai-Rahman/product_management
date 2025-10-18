'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Product } from '@/lib/_types/products';
import { Trash2, Eye, Edit2, Package, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ResultNotFound from '@/components/ui/result-not-found';

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function ProductTable({
  products,
  onDelete,
  isLoading = false,
}: ProductTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  if (products.length === 0 && !isLoading) {
    return (
      <ResultNotFound
        message="No Products Found"
        description="Get started by creating your first product."
        icon="package"
        actionLabel="Create Product"
        onAction={() => (window.location.href = '/products/create')}
      />
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-card to-muted/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5">
            <TableHead className="text-foreground font-semibold">
              Product
            </TableHead>
            <TableHead className="text-foreground font-semibold hidden sm:table-cell">
              Category
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Price
            </TableHead>
            <TableHead className="text-foreground font-semibold hidden md:table-cell">
              Created
            </TableHead>
            <TableHead className="text-foreground font-semibold hidden lg:table-cell">
              Updated
            </TableHead>
            <TableHead className="text-right text-foreground font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="border-b border-border hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-200"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        width={48}
                        height={48}
                        unoptimized
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground truncate text-sm sm:text-base max-w-[12rem] 
                truncate sm:line-clamp-2">
                      {product.name}
                    </p>
                    <p
                      className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-[12rem] 
                truncate sm:line-clamp-2"
                    >
                      {product.description}
                    </p>
                    {/* Show category and date on mobile */}
                    <div className="sm:hidden mt-1 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell className="hidden sm:table-cell">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20">
                  {product.category?.name || 'Uncategorized'}
                </span>
              </TableCell>

              <TableCell>
                <span className="font-semibold text-lg text-accent">
                  ${product.price?.toFixed(2) || '0.00'}
                </span>
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </TableCell>

              <TableCell className="hidden lg:table-cell">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(product.updatedAt).toLocaleDateString()}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Link href={`/products/${product.slug || product.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </Link>
                  <Link href={`/products/edit/${product.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-accent hover:text-accent hover:bg-accent/10 transition-all duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                        disabled={deletingId === product.id}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{product.name}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product.id)}
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
