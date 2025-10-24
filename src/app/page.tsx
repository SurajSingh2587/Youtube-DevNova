'use client';

import { useEffect, useState } from 'react';
import VideoCard from '@/components/videos/VideoCard';
import { videos, type Video } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default function Home() {
  const [shuffledVideos, setShuffledVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We shuffle the videos on the client to ensure randomness on each load
    setShuffledVideos(shuffleArray([...videos]));
    setLoading(false);
  }, []);

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
          : shuffledVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
      </div>
    </main>
  );
}
