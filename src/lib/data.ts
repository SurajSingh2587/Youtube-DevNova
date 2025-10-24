import type { Video, Channel, Comment } from '@/lib/types';
import { subDays, subHours, subMinutes, subMonths, subWeeks } from 'date-fns';
import { seedVideos } from './seed';

const now = new Date();

export const channels: Channel[] = [
  {
    id: 'chan-01',
    name: 'CodeWizard',
    avatarUrl: 'https://picsum.photos/seed/avatar01/48/48',
    subscribers: 123000,
    bannerUrl: 'https://picsum.photos/seed/banner01/1280/280',
  },
  {
    id: 'chan-02',
    name: 'FoodieFusion',
    avatarUrl: 'https://picsum.photos/seed/avatar02/48/48',
    subscribers: 45000,
    bannerUrl: 'https://picsum.photos/seed/banner02/1280/280',
  },
  {
    id: 'chan-03',
    name: 'PetPals',
    avatarUrl: 'https://picsum.photos/seed/avatar03/48/48',
    subscribers: 250000,
    bannerUrl: 'https://picsum.photos/seed/banner03/1280/280',
  },
  {
    id: 'chan-04',
    name: 'MusicMinds',
    avatarUrl: 'https://picsum.photos/seed/avatar04/48/48',
    subscribers: 89000,
    bannerUrl: 'https://picsum.photos/seed/banner04/1280/280',
  },
  {
    id: 'chan-05',
    name: 'TravelVibes',
    avatarUrl: 'https://picsum.photos/seed/avatar05/48/48',
    subscribers: 310000,
    bannerUrl: 'https://picsum.photos/seed/banner05/1280/280',
  },
  {
    id: 'chan-06',
    name: 'ArtExplorers',
    avatarUrl: 'https://picsum.photos/seed/avatar06/48/48',
    subscribers: 56000,
    bannerUrl: 'https://picsum.photos/seed/banner06/1280/280',
  },
];

export const videos: Video[] = seedVideos(channels);

export const comments: Comment[] = [
    {
      id: 'com-01',
      videoId: 'vid-0',
      channelId: 'chan-02',
      text: 'Great tutorial! Super clear and easy to follow.',
      timestamp: subMinutes(now, 10),
    },
    {
      id: 'com-02',
      videoId: 'vid-0',
      channelId: 'chan-04',
      text: 'Thanks for this! Just what I needed to get started.',
      timestamp: subHours(now, 1),
    },
    {
      id: 'com-03',
      videoId: 'vid-0',
      channelId: 'chan-05',
      text: 'Could you do a video on deploying a Next.js app?',
      timestamp: subDays(now, 1),
    },
    {
      id: 'com-04',
      videoId: 'vid-1',
      channelId: 'chan-01',
      text: 'My pizza has never been better! Thank you!',
      timestamp: subMinutes(now, 30),
    },
    {
        id: 'com-05',
        videoId: 'vid-1',
        channelId: 'chan-03',
        text: 'I burnt it... but I will try again!',
        timestamp: subHours(now, 2),
    },
];

export const watchHistory: string[] = ['vid-0', 'vid-1', 'vid-4', 'vid-8'];
