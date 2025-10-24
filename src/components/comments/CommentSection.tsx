'use client';

import { useState } from 'react';
import type { Comment as CommentType } from '@/lib/types';
import { channels } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNowStrict } from 'date-fns';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

interface CommentSectionProps {
  videoId: string;
  initialComments: CommentType[];
}

export default function CommentSection({ videoId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const comment: CommentType = {
      id: `com-${Date.now()}`,
      videoId,
      channelId: 'chan-05', // Mock user channel
      text: newComment,
      timestamp: new Date(),
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold">{comments.length} Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mt-4 flex items-start gap-4">
        <Avatar>
          <AvatarImage src="https://picsum.photos/seed/avatar07/40/40" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="rounded-full bg-secondary"
          />
          {newComment && (
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setNewComment('')} className="rounded-full">Cancel</Button>
              <Button type="submit" className="rounded-full" disabled={!newComment.trim()}>Comment</Button>
            </div>
          )}
        </div>
      </form>
      <Separator className="my-6" />
      <div className="space-y-6">
        {comments.map((comment) => {
          const channel = channels.find((c) => c.id === comment.channelId);
          return (
            <div key={comment.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={channel?.avatarUrl} />
                <AvatarFallback>{channel?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{channel?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNowStrict(comment.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p>{comment.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
