'use server';

/**
 * @fileOverview Generates video recommendations based on a user's watch history.
 *
 * - getVideoRecommendations - A function that generates video recommendations.
 * - VideoRecommendationsInput - The input type for the getVideoRecommendations function.
 * - VideoRecommendationsOutput - The return type for the getVideoRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VideoRecommendationsInputSchema = z.object({
  watchHistory: z
    .array(z.string())
    .describe('An array of video IDs representing the user watch history.'),
  numberOfRecommendations: z
    .number()
    .default(5)
    .describe('The number of video recommendations to generate.'),
});
export type VideoRecommendationsInput = z.infer<typeof VideoRecommendationsInputSchema>;

const VideoRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of video IDs representing the video recommendations.'),
});
export type VideoRecommendationsOutput = z.infer<typeof VideoRecommendationsOutputSchema>;

export async function getVideoRecommendations(input: VideoRecommendationsInput): Promise<VideoRecommendationsOutput> {
  return videoRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'videoRecommendationsPrompt',
  input: {schema: VideoRecommendationsInputSchema},
  output: {schema: VideoRecommendationsOutputSchema},
  prompt: `You are a video recommendation expert. Given a user's watch history, you will generate a list of video recommendations that the user might be interested in.

  Watch History: {{watchHistory}}

  Please provide {{numberOfRecommendations}} video recommendations as an array of video IDs.`,
});

const videoRecommendationsFlow = ai.defineFlow(
  {
    name: 'videoRecommendationsFlow',
    inputSchema: VideoRecommendationsInputSchema,
    outputSchema: VideoRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
