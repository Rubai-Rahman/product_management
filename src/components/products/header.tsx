'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Package, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/authSlice';
import { toast } from 'sonner';

interface HeaderProps {
  title: string;
  btnText: string;
  showCreateButton?: boolean;
  showCategoriesButton?: boolean;
  showLogoutButton?: boolean;
}

const Header = ({
  title,
  btnText,
  showCreateButton = false,
  showCategoriesButton = false,
  showLogoutButton = true,
}: HeaderProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Link href="/products">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 sm:gap-2 px-2 sm:px-3"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{btnText}</span>
              </Button>
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {showCategoriesButton && (
              <Link href="/categories">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 sm:gap-2 px-2 sm:px-3"
                >
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Categories</span>
                </Button>
              </Link>
            )}

            {showCreateButton && (
              <Link href="/products/create">
                <Button className="bg-gradient-to-r from-primary to-accent hover:bg-primary/90 text-primary-foreground gap-1 sm:gap-2 px-2 sm:px-3">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Product</span>
                </Button>
              </Link>
            )}

            {showLogoutButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-1 sm:gap-2 px-2 sm:px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
