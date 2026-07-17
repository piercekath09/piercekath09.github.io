import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getBlogUrl } from '../lib/urls';

export async function GET(context: any) {
  const blogs = await getCollection('blog');
  const isProd = import.meta.env.PROD;
  
  // Filter drafts
  const publicBlogs = blogs.filter((post) => !isProd || !post.data.draft);

  // Sort by date descending
  publicBlogs.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: 'Antigravity Blog',
    description: 'Structured deep dives into artificial intelligence, software design patterns, and web engineering.',
    site: context.site || 'https://piercekath09.github.io',
    items: publicBlogs.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // RSS items require a resolved path
      link: getBlogUrl(post),
      customData: `<guid>${context.site || 'https://piercekath09.github.io'}${getBlogUrl(post)}</guid>`
    })),
  });
}
