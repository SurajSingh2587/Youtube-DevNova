'use client';

import { useState, useEffect, useCallback } from 'react';

const SUBSCRIPTIONS_KEY = 'youtube_subscriptions';

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedSubscriptions = localStorage.getItem(SUBSCRIPTIONS_KEY);
      if (storedSubscriptions) {
        setSubscriptions(JSON.parse(storedSubscriptions));
      } else {
        // Default subscriptions
        const defaultSubs = ['chan-01', 'chan-03', 'chan-05'];
        setSubscriptions(defaultSubs);
        localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(defaultSubs));
      }
    } catch (error) {
      console.error('Failed to parse subscriptions from localStorage', error);
      setSubscriptions([]);
    }
  }, []);

  const toggleSubscription = useCallback((channelId: string) => {
    setSubscriptions((prev) => {
      const isSubscribed = prev.includes(channelId);
      const newSubscriptions = isSubscribed
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId];
      try {
        localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(newSubscriptions));
      } catch (error) {
        console.error('Failed to save subscriptions to localStorage', error);
      }
      return newSubscriptions;
    });
  }, []);

  return { subscriptions, toggleSubscription };
};
