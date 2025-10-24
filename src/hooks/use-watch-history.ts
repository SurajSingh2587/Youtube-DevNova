'use client';

import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'youtube_watch_history';

export const useWatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setWatchHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to parse watch history from localStorage', error);
      setWatchHistory([]);
    }
  }, []);

  const addToHistory = useCallback((videoId: string) => {
    setWatchHistory((prevHistory) => {
      // Avoid duplicates and keep the most recent at the start
      const newHistory = [videoId, ...prevHistory.filter((id) => id !== videoId)];
      // Limit history size
      const limitedHistory = newHistory.slice(0, 50);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
      } catch (error) {
        console.error('Failed to save watch history to localStorage', error);
      }
      return limitedHistory;
    });
  }, []);

  return { watchHistory, addToHistory };
};
