import type { Video, Channel } from '@/lib/types';
import { subDays, subHours, subMinutes, subMonths, subWeeks } from 'date-fns';

const now = new Date();

const videoTemplates = [
  {
    title: 'Building a Next.js App',
    description: 'A tutorial on how to get started with Next.js and build a simple application.',
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
  },
  {
    title: 'The Perfect Pizza Dough Recipe',
    description: 'Learn how to make the perfect pizza dough at home. It\'s easier than you think!',
    tags: ['Cooking', 'Pizza', 'Recipe', 'Food'],
  },
  {
    title: 'Advanced React Patterns',
    description: 'Dive deep into advanced React patterns like Higher-Order Components, Render Props, and Hooks.',
    tags: ['React', 'JavaScript', 'Programming', 'Advanced'],
  },
  {
    title: 'Funny Animal Moments Compilation',
    description: 'A compilation of the funniest animal moments to brighten your day.',
    tags: ['Dogs', 'Cats', 'Funny', 'Animals', 'Cute'],
  },
  {
    title: 'Acoustic Guitar for Beginners',
    description: 'Learn your first three chords on the acoustic guitar and play thousands of songs.',
    tags: ['Guitar', 'Music', 'Lesson', 'Beginner'],
  },
  {
    title: 'A Cinematic 4K Drone Film',
    description: 'Experience stunning landscapes from a unique perspective. Shot on a DJI Mavic 3.',
    tags: ['Travel', 'Drone', '4K', 'Cinematic'],
  },
  {
    title: 'Watercolor Painting Tutorial',
    description: 'Follow along as I paint a beautiful landscape using watercolors. For all skill levels.',
    tags: ['Art', 'Painting', 'Watercolor', 'Tutorial'],
  },
  {
    title: 'Full Body Workout - No Equipment',
    description: 'A 30-minute high-intensity interval training (HIIT) workout you can do at home with no equipment.',
    tags: ['Fitness', 'Workout', 'HIIT', 'Home Workout'],
  },
  {
    title: 'Exploring Hidden Beaches',
    description: 'Join me as we explore the most beautiful and hidden beaches in the world.',
    tags: ['Travel', 'Beach', 'Adventure', 'Exploration'],
  },
  {
    title: 'Latte Art for Dummies',
    description: 'A step-by-step guide to creating beautiful latte art, even if you\'re a complete beginner.',
    tags: ['Coffee', 'Latte Art', 'Tutorial', 'Barista'],
  },
  {
    title: 'How I Read 100 Books a Year',
    description: 'My personal strategies and tips for reading more books and retaining information.',
    tags: ['Reading', 'Books', 'Productivity', 'Self-Help'],
  },
  {
    title: 'Cats vs. Dogs: The Great Debate',
    description: 'A humorous and scientific look at the age-old debate. Which pet is truly superior?',
    tags: ['Cats', 'Dogs', 'Funny', 'Animals', 'Debate'],
  },
];

const getRandomDate = () => {
    const start = new Date(2022, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function seedVideos(channels: Channel[], count = 520): Video[] {
  const videos: Video[] = [];
  for (let i = 0; i < count; i++) {
    const template = videoTemplates[i % videoTemplates.length];
    const channel = channels[i % channels.length];
    
    videos.push({
      id: `vid-${i}`,
      title: `${template.title} #${Math.floor(i / videoTemplates.length) + 1}`,
      description: template.description,
      tags: template.tags,
      thumbnailUrl: `https://picsum.photos/seed/thumb${i}/480/270`,
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      channelId: channel.id,
      uploadDate: getRandomDate(),
      views: Math.floor(Math.random() * 2000000) + 1000,
      likes: Math.floor(Math.random() * 100000) + 100,
      dislikes: Math.floor(Math.random() * 5000) + 10,
    });
  }
  return videos;
}
