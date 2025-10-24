'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import AppLogo from './AppLogo';
import { Home, History, Youtube, Clapperboard, Flame, Library, PlaySquare, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { channels } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSubscriptions } from '@/hooks/use-subscriptions';

const mainNav = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/trending', icon: Flame, label: 'Trending' },
  { href: '/subscriptions', icon: Youtube, label: 'Subscriptions' },
];

const libraryNav = [
  { href: '/history', icon: History, label: 'History' },
  { href: '/my-videos', icon: PlaySquare, label: 'Your Videos' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { subscriptions } = useSubscriptions();

  const subscribedChannels = channels.filter(channel => subscriptions.includes(channel.id));


  return (
    <>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden"/>
            <AppLogo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainNav.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} className='w-full'>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className="justify-start"
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
            <SidebarMenuItem className='px-2 text-sm font-semibold text-muted-foreground'>
                <div className='flex items-center gap-2'>
                    <Library className="h-5 w-5" />
                    <span>Library</span>
                </div>
            </SidebarMenuItem>
          {libraryNav.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} className='w-full'>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className="justify-start"
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem className="px-2 text-sm font-semibold text-muted-foreground">
            Subscriptions
          </SidebarMenuItem>
          {subscribedChannels.length > 0 ? (
            subscribedChannels.map((channel) => (
              <SidebarMenuItem key={channel.id}>
                <Link href={`/channel/${channel.id}`} className='w-full'>
                  <SidebarMenuButton className="justify-start h-10" tooltip={channel.name}>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={channel.avatarUrl} />
                      <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{channel.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))
          ) : (
            <SidebarMenuItem className="px-4 text-xs text-muted-foreground">
              No subscriptions yet.
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
