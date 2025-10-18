import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ProductsSkeleton() {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5">
            <TableHead className="text-foreground font-semibold">
              Product
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Category
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Price
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Created
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Updated
            </TableHead>
            <TableHead className="text-right text-foreground font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="border-b border-border">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
