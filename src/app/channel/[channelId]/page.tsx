'use client';

import { notFound } from 'next/navigation';
import { videos, channels } from '@/lib/data';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, PlaySquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import VideoCard from '@/components/videos/VideoCard';
import { formatSubscribers } from '@/lib/formatters';
import { useSubscriptions } from '@/hooks/use-subscriptions';

export default function ChannelPage({ params }: { params: { channelId: string } }) {
  const channel = channels.find((c) => c.id === params.channelId);
  const { subscriptions, toggleSubscription } = useSubscriptions();

  if (!channel) {
    notFound();
  }

  const isSubscribed = subscriptions.includes(channel.id);
  const channelVideos = videos.filter((v) => v.channelId === channel.id);

  return (
    <main className="flex-1">
      <div className="relative h-32 md:h-48 w-full">
        <Image
          src={channel.bannerUrl}
          alt={`${channel.name} banner`}
          fill
          className="object-cover"
          data-ai-hint="channel banner"
        />
      </div>
      <div className="container mx-auto max-w-6xl p-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 -mt-12 md:-mt-16">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
                <AvatarImage src={channel.avatarUrl} alt={channel.name} />
                <AvatarFallback className="text-4xl">{channel.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{channel.name}</h1>
                <p className="text-muted-foreground">@{channel.name.toLowerCase()}</p>
                <p className="text-muted-foreground">{formatSubscribers(channel.subscribers)} subscribers &bull; {channelVideos.length} videos</p>
            </div>
            <Button size="lg" className="rounded-full" onClick={() => toggleSubscription(channel.id)} variant={isSubscribed ? 'secondary' : 'default'}>
                <Bell className="mr-2 h-5 w-5" />
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
        </div>

        <Separator className="my-8" />
        
        <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <PlaySquare />
                Videos
            </h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {channelVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
      </div>
    </main>
  );
}
