export type Video = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl: string;
  channelId: string;
  uploadDate: Date;
  views: number;
  likes: number;
  dislikes: number;
};

export type Channel = {
  id: string;
  name: string;
  avatarUrl: string;
  subscribers: number;
  bannerUrl: string;
};

export type Comment = {
  id: string;
  videoId: string;
  channelId: string;
  text: string;
  timestamp: Date;
};
