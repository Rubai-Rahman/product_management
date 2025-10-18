'use client';

import { Button } from '@/components/ui/button';
import { Trash2, Eye, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/_types/products';
import Image from 'next/image';
interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  console.log('productsrecive', products);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Image
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Product Name
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Price
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Link href={`/products/${product.slug}`}>
              <tr
                key={product.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={50}
                    height={50}
                    unoptimized
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="font-semibold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/products/${product.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                    </Link>
                    <Link href={`/products/${product.id}/edit`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                      className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}
