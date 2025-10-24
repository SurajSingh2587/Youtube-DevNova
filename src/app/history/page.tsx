'use client';

import { useWatchHistory } from "@/hooks/use-watch-history";
import { videos, channels } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { formatViews, formatPublishedDate } from "@/lib/formatters";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { History } from "lucide-react";

export default function HistoryPage() {
    const { watchHistory } = useWatchHistory();
    
    const watchedVideos = watchHistory.map(id => videos.find(v => v.id === id)).filter(Boolean);

    return (
        <main className="container mx-auto max-w-5xl p-4">
            <div className="flex items-center gap-4 mb-4">
                <History className="w-8 h-8"/>
                <h1 className="text-3xl font-bold">Watch History</h1>
            </div>
            <Separator />
            <div className="mt-4 flex flex-col gap-4">
                {watchedVideos.length > 0 ? (
                    watchedVideos.map(video => {
                        if (!video) return null;
                        const channel = channels.find(c => c.id === video.channelId);
                        if (!channel) return null;

                        return (
                             <Link href={`/watch/${video.id}`} key={video.id} className="group">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="relative aspect-video w-full md:w-64 flex-shrink-0 overflow-hidden rounded-lg">
                                        <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary">{video.title}</h2>
                                        <p className="text-sm text-muted-foreground">{formatViews(video.views)} views &bull; {formatPublishedDate(video.uploadDate)}</p>
                                        <div className="flex items-center gap-2 my-2">
                                            <Avatar className="w-6 h-6">
                                                <AvatarImage src={channel.avatarUrl} />
                                                <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm text-muted-foreground">{channel.name}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">Your watch history is empty.</p>
                        <p className="text-muted-foreground">Videos you watch will appear here.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
