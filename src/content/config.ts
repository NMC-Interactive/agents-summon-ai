import { defineCollection, z } from 'astro:content';

const agentsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    repo: z.string().url(),
    downloads: z.number().default(0),
    rating: z.number().min(0).max(5).default(0),
    votes: z.number().default(0),
    featured: z.boolean().default(false),
    install_command: z.string(),
    screenshot: z.string().optional(),
    logo: z.string().optional(),
    published: z.date().optional(),
    updated: z.date().optional(),
  }),
});

const skillsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    repo: z.string().url().optional(),
    downloads: z.number().default(0),
    rating: z.number().min(0).max(5).default(0),
    votes: z.number().default(0),
    featured: z.boolean().default(false),
    install_command: z.string(),
    compatible_agents: z.array(z.string()).default([]),
    published: z.date().optional(),
    updated: z.date().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    related_agents: z.array(z.string()).default([]),
    related_skills: z.array(z.string()).default([]),
    cover_image: z.string().optional(),
  }),
});

export const collections = {
  agents: agentsCollection,
  skills: skillsCollection,
  blog: blogCollection,
};