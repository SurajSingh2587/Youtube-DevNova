'use client';

import { useEffect, useState } from 'react';
import VideoCard from '@/components/videos/VideoCard';
import { useWatchHistory } from '@/hooks/use-watch-history';
import { getVideoRecommendations } from '@/ai/flows/video-recommendations';
import { videos, type Video } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { watchHistory } = useWatchHistory();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Use a default or recent history for initial recommendations
        const historyToUse = watchHistory.length > 0 ? watchHistory : ['vid-01', 'vid-02'];
        const result = await getVideoRecommendations({
          watchHistory: historyToUse,
          numberOfRecommendations: 12,
        });
        
        const recommendedIds = new Set(result.recommendations);
        const filteredVideos = videos.filter((video) => recommendedIds.has(video.id));
        
        // If AI gives fewer than requested, fill with other videos
        if (filteredVideos.length < 12) {
          const additionalVideos = videos.filter(v => !recommendedIds.has(v.id)).slice(0, 12 - filteredVideos.length);
          setRecommendedVideos([...filteredVideos, ...additionalVideos]);
        } else {
          setRecommendedVideos(filteredVideos);
        }

      } catch (error) {
        console.error('Failed to get video recommendations:', error);
        // Fallback to showing a generic list of videos
        setRecommendedVideos(videos.slice(0, 12));
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [watchHistory]);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-video w-full" />
                <div className="flex items-start gap-2">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </div>
            ))
          : recommendedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
      </div>
    </main>
  );
}
