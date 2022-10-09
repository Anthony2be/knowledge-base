import z from 'zod';

export const createPostSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1),
    description: z.string().max(255).min(1),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;