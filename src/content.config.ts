import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Topics Collection
// Loads metadata from _topic.json inside topic folders
// Entry ID will be the folder name (e.g., "ai-engineering")
const topics = defineCollection({
  loader: glob({
    pattern: '**/_topic.json',
    base: './src/content/blog',
    generateId: ({ entry }) => {
      const parts = entry.split('/');
      return parts[parts.length - 2]; // Folder name
    }
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string().optional(),
    order: z.number().optional(),
  })
});

// 2. Series Collection
// Loads metadata from _series.json inside series folders
// Entry ID will be "topic/series" (e.g., "ai-engineering/rag-systems")
const seriesBaseLoader = glob({
  pattern: '**/_series.json',
  base: './src/content/blog',
  generateId: ({ entry }) => {
    const parts = entry.split('/');
    return `${parts[0]}/${parts[1]}`; // topic/series
  }
});

const seriesLoader = {
  ...seriesBaseLoader,
  load: async (context: any) => {
    const originalParse = context.parseData;
    context.parseData = async (options: any) => {
      // options.id is e.g. "ai-engineering/rag-systems"
      const parts = options.id.split('/');
      let topic = options.data.topic;
      if (!topic) {
        topic = parts[0]; // e.g. "ai-engineering"
      }
      options.data = {
        ...options.data,
        topic,
      };
      return originalParse(options);
    };
    return seriesBaseLoader.load(context);
  }
};

const series = defineCollection({
  loader: seriesLoader as any,
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: reference('topics'),
    order: z.number().optional(),
  })
});

// 3. Blog Collection
// Loads blog markdown files
// Entry ID will be "topic/slug" or "topic/series/slug"
const blogBaseLoader = glob({
  pattern: '**/[^_]*.{md,mdx}',
  base: './src/content/blog',
});

const blogLoader = {
  ...blogBaseLoader,
  load: async (context: any) => {
    const originalParse = context.parseData;
    context.parseData = async (options: any) => {
      // options.id will be "topic/slug" or "topic/series/slug"
      const parts = options.id.split('/');
      
      let topic = options.data.topic;
      let series = options.data.series;
      
      if (parts.length === 2) {
        // topic/blog-post
        if (!topic) topic = parts[0];
      } else if (parts.length === 3) {
        // topic/series/blog-post
        if (!topic) topic = parts[0];
        if (!series) {
          series = `${parts[0]}/${parts[1]}`; // e.g., "ai-engineering/rag-systems"
        } else if (typeof series === 'string' && !series.includes('/')) {
          series = `${topic}/${series}`;
        }
      }
      
      options.data = {
        ...options.data,
        topic,
        series,
      };
      return originalParse(options);
    };
    return blogBaseLoader.load(context);
  }
};

const blog = defineCollection({
  loader: blogLoader as any,
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    topic: z.string(), // Inferred from path
    series: z.string().optional(), // Inferred from path (topicSlug/seriesSlug)
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
  })
});

export const collections = {
  topics,
  series,
  blog
};
