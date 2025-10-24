'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { videos, channels, comments } from '@/lib/data';
import VideoPlayer from '@/components/videos/VideoPlayer';
import CommentSection from '@/components/comments/CommentSection';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Share2, Bell } from 'lucide-react';
import { formatSubscribers, formatViews } from '@/lib/formatters';
import Link from 'next/link';
import VideoCard from '@/components/videos/VideoCard';
import { useWatchHistory } from '@/hooks/use-watch-history';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function WatchPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  const { addToHistory } = useWatchHistory();

  useEffect(() => {
    if (videoId) {
      addToHistory(videoId);
    }
  }, [videoId, addToHistory]);

  const video = videos.find((v) => v.id === videoId);
  const channel = channels.find((c) => c.id === video?.channelId);
  const videoComments = comments.filter((c) => c.videoId === videoId);
  const upNextVideos = videos.filter((v) => v.id !== videoId).slice(0, 10);

  if (!video || !channel) {
    return (
      <div className="container mx-auto flex max-w-7xl flex-col gap-8 p-4 lg:flex-row">
        <div className="flex-1">
          <Skeleton className="aspect-video w-full" />
          <div className="mt-4 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-4 w-1/6" />
              </div>
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex max-w-[95rem] flex-col gap-4 p-2 md:p-4 lg:flex-row lg:gap-8">
      <div className="flex-1">
        <VideoPlayer video={video} />
        <div className="mt-4">
          <h1 className="text-xl font-bold md:text-2xl">{video.title}</h1>
          <div className="mt-2 flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <Link href={`/channel/${channel.id}`}>
                <Avatar className="h-11 w-11">
                  <AvatarImage src={channel.avatarUrl} />
                  <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link href={`/channel/${channel.id}`} className="font-semibold">{channel.name}</Link>
                <p className="text-sm text-muted-foreground">{formatSubscribers(channel.subscribers)} subscribers</p>
              </div>
              <Button variant="outline" className="ml-4 rounded-full">
                <Bell className="mr-2 h-4 w-4" /> Subscribed
              </Button>
            </div>
            <div className="flex items-center gap-2 md:ml-auto">
              <div className="flex items-center rounded-full bg-secondary">
                <Button variant="ghost" className="rounded-r-none rounded-l-full">
                  <ThumbsUp className="mr-2 h-5 w-5" /> {formatViews(video.likes)}
                </Button>
                <Separator orientation="vertical" className="h-6"/>
                <Button variant="ghost" className="rounded-l-none rounded-r-full">
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="secondary" className="rounded-full">
                <Share2 className="mr-2 h-5 w-5" /> Share
              </Button>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-secondary p-4">
            <p className="font-semibold">
              {formatViews(video.views)} views &bull; {video.uploadDate.toLocaleDateString()}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm">{video.description}</p>
          </div>
        </div>
        <CommentSection videoId={video.id} initialComments={videoComments} />
      </div>
      <aside className="w-full lg:w-96 lg:flex-shrink-0">
        <h2 className="mb-4 text-xl font-semibold">Up Next</h2>
        <div className="flex flex-col gap-4">
          {upNextVideos.map((nextVideo) => (
             <Link href={`/watch/${nextVideo.id}`} key={nextVideo.id} className="group">
                <div className="flex gap-2">
                    <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image src={nextVideo.thumbnailUrl} alt={nextVideo.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div>
                        <h3 className="line-clamp-2 text-sm font-semibold">{nextVideo.title}</h3>
                        <p className="text-xs text-muted-foreground">{channels.find(c => c.id === nextVideo.channelId)?.name}</p>
                        <p className="text-xs text-muted-foreground">{formatViews(nextVideo.views)} views</p>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
