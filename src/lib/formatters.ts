import { formatDistanceToNowStrict } from 'date-fns';

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K`;
  }
  return views.toString();
}

export function formatSubscribers(subscribers: number): string {
    if (subscribers >= 1000000) {
      return `${(subscribers / 1000000).toFixed(1)}M`;
    }
    if (subscribers >= 1000) {
      return `${(subscribers / 1000).toFixed(0)}K`;
    }
    return subscribers.toString();
  }

export function formatPublishedDate(date: Date): string {
    return formatDistanceToNowStrict(date, { addSuffix: true });
}
