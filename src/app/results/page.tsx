'use client'

import { useSearchParams } from "next/navigation";
import { videos, channels } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { formatViews, formatPublishedDate } from "@/lib/formatters";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('search_query')?.toLowerCase() || '';

    const filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.tags.some(tag => tag.toLowerCase().includes(query))
    );

    return (
        <main className="container mx-auto max-w-5xl p-4">
            <h1 className="text-2xl font-bold mb-4">Results for "{query}"</h1>
            <Separator />
            <div className="mt-4 flex flex-col gap-4">
                {filteredVideos.length > 0 ? (
                    filteredVideos.map(video => {
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
                        );
                    })
                ) : (
                    <p>No results found for "{query}". Try another search.</p>
                )}
            </div>
        </main>
    )
}
