'use client';

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
import { Product } from '@/lib/_types/products';
import { Trash2, Eye, Edit2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5">
            <TableHead className="text-foreground font-semibold">
              Image
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Product Name
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Category
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Price
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
              className="border-b border-border hover:bg-muted/50 transition-colors"
            >
              <TableCell>
                <div className="max-w-[150px] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    width={50}
                    height={50}
                    unoptimized
                    alt={product.id}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[150px] overflow-hidden">
                  <p className="font-semibold text-foreground truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1 break-all">
                    {product.description}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {product.category.name}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/products/${product.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </Link>
                  <Link href={`/products/${product.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-accent hover:text-accent hover:bg-accent/10"
                    >
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
