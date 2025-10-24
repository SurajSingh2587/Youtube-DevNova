'use client';

import { useState, useEffect, useCallback } from 'react';

const LIKED_VIDEOS_KEY = 'youtube_liked_videos';
const DISLIKED_VIDEOS_KEY = 'youtube_disliked_videos';

export const useLikes = () => {
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [dislikedVideos, setDislikedVideos] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem(LIKED_VIDEOS_KEY);
      const storedDislikes = localStorage.getItem(DISLIKED_VIDEOS_KEY);
      if (storedLikes) {
        setLikedVideos(JSON.parse(storedLikes));
      }
      if (storedDislikes) {
        setDislikedVideos(JSON.parse(storedDislikes));
      }
    } catch (error) {
      console.error('Failed to parse likes/dislikes from localStorage', error);
    }
  }, []);

  const toggleLike = useCallback((videoId: string) => {
    setLikedVideos((prev) => {
      const isLiked = prev.includes(videoId);
      const newLiked = isLiked ? prev.filter((id) => id !== videoId) : [...prev, videoId];
      localStorage.setItem(LIKED_VIDEOS_KEY, JSON.stringify(newLiked));
      
      // If video was disliked, remove it from dislikes
      if (!isLiked) {
        setDislikedVideos((prevDisliked) => {
          if (prevDisliked.includes(videoId)) {
            const newDisliked = prevDisliked.filter((id) => id !== videoId);
            localStorage.setItem(DISLIKED_VIDEOS_KEY, JSON.stringify(newDisliked));
            return newDisliked;
          }
          return prevDisliked;
        });
      }
      return newLiked;
    });
  }, []);

  const toggleDislike = useCallback((videoId: string) => {
    setDislikedVideos((prev) => {
      const isDisliked = prev.includes(videoId);
      const newDisliked = isDisliked ? prev.filter((id) => id !== videoId) : [...prev, videoId];
      localStorage.setItem(DISLIKED_VIDEOS_KEY, JSON.stringify(newDisliked));
      
      // If video was liked, remove it from likes
      if (!isDisliked) {
          setLikedVideos((prevLiked) => {
              if (prevLiked.includes(videoId)) {
                  const newLiked = prevLiked.filter((id) => id !== videoId);
                  localStorage.setItem(LIKED_VIDEOS_KEY, JSON.stringify(newLiked));
                  return newLiked;
              }
              return prevLiked;
          });
      }
      return newDisliked;
    });
  }, []);

  return { likedVideos, dislikedVideos, toggleLike, toggleDislike };
};
