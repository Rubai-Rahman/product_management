import { Package, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResultNotFoundProps {
  message?: string;
  description?: string;
  icon?: 'package' | 'search' | 'error';
  actionLabel?: string;
  onAction?: () => void;
}

export default function ResultNotFound({
  message = 'No results found',
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon = 'package',
  actionLabel,
  onAction,
}: ResultNotFoundProps) {
  const IconComponent = {
    package: Package,
    search: Search,
    error: AlertCircle,
  }[icon];

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
      <CardContent className="p-12 text-center">
        <IconComponent className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {message}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
