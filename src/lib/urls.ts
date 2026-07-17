import type { CollectionEntry } from 'astro:content';

/**
 * Get the URL for a Topic page.
 */
export function getTopicUrl(topicSlug: string): string {
  // Ensure starting and ending slashes
  return `/${topicSlug.replace(/^\/|\/$/g, '')}/`;
}

/**
 * Get the URL for a Series page.
 * Accepts either (topicSlug, seriesSlug) or a combined seriesId (topic/series).
 */
export function getSeriesUrl(topicSlug: string, seriesSlug?: string): string {
  if (!seriesSlug) {
    // If only one argument is passed, assume it's the full series ID "topic/series"
    const parts = topicSlug.split('/');
    if (parts.length === 2) {
      return `/${parts[0]}/${parts[1]}/`;
    }
    return `/${topicSlug}/`;
  }
  return `/${topicSlug.replace(/^\/|\/$/g, '')}/${seriesSlug.replace(/^\/|\/$/g, '')}/`;
}

/**
 * Get the URL for a Blog Post page.
 * Handles both 2-tier (topic/slug) and 3-tier (topic/series/slug) paths,
 * respecting any manual overrides in post frontmatter.
 */
export function getBlogUrl(post: CollectionEntry<'blog'>): string {
  const postSlug = post.id.split('/').pop() || '';
  const topic = post.data.topic;
  const series = post.data.series;

  if (series) {
    // series is stored as "topicSlug/seriesSlug"
    const seriesSlug = series.includes('/') ? series.split('/')[1] : series;
    return `/${topic}/${seriesSlug}/${postSlug}/`;
  }

  return `/${topic}/${postSlug}/`;
}
