import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'There was an error loading the data. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
}: ErrorStateProps) {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
      <CardContent className="p-12 text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
        <h3 className="text-xl font-semibold text-destructive mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {retryLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
