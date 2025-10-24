import type { Video, Channel } from '@/lib/types';
import { channels } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNowStrict } from 'date-fns';
import { formatViews } from '@/lib/formatters';

type VideoCardProps = {
  video: Video;
};

export default function VideoCard({ video }: VideoCardProps) {
  const channel = channels.find((c) => c.id === video.channelId);

  if (!channel) return null;

  return (
    <Link href={`/watch/${video.id}`} className="group">
      <div className="flex flex-col gap-2">
        <div className="relative aspect-video overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:rounded-none group-hover:shadow-xl">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="video thumbnail"
          />
        </div>
        <div className="flex items-start gap-3">
          <Link href={`/channel/${channel.id}`} className="flex-shrink-0">
            <Avatar>
              <AvatarImage src={channel.avatarUrl} alt={channel.name} />
              <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <h3 className="line-clamp-2 text-base font-semibold leading-tight group-hover:text-primary">
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground">{channel.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatViews(video.views)} views &bull;{' '}
              {formatDistanceToNowStrict(video.uploadDate, { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
