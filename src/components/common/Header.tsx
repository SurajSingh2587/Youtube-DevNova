'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import AppLogo from './AppLogo';
import { Search, Upload, Bell } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';

export default function AppHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search_query') as string;
    if(query) {
      router.push(`/results?search_query=${encodeURIComponent(query)}`);
    }
  };


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="hidden md:flex" />
        <Link href="/">
          <AppLogo />
        </Link>
      </div>

      <div className="flex-1">
        <form onSubmit={handleSearch} className="relative mx-auto max-w-2xl">
          <Input
            name="search_query"
            defaultValue={searchParams.get('search_query') || ''}
            className="h-10 rounded-full border-2 bg-background pl-12 pr-20"
            placeholder="Search"
          />
          <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/upload">
            <Upload className="h-5 w-5" />
            <span className="sr-only">Upload Video</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://picsum.photos/seed/avatar07/40/40" data-ai-hint="woman portrait" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
