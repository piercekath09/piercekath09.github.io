# Antigravity — Minimalist 3-Tier Astro Blog Site

A fast, minimalist technical blog hub built with Astro and styled with raw CSS custom properties. It utilizes a 3-tier content hierarchy (Topic &rarr; Series &rarr; Blog Post) with path-based frontmatter inference.

## Getting Started

### Prerequisites
- Node.js >= 22.12.0
- npm

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

---

## Content Architecture & Creation Guide

The blog site is structured using three tiers: **Topic**, **Series**, and **Blog Post**. A blog post can live inside a series (`Topic -> Series -> Post`) or directly inside a topic (`Topic -> Post`). 

Relationships like `topic` and `series` are automatically inferred from the folder hierarchy at build time, but can be overridden in frontmatter if needed.

### 1. Adding a New Topic (Tier 1)
To create a new topic, create a folder under `src/content/blog/` and place a `_topic.json` metadata file inside it.

- **Path:** `src/content/blog/my-topic-slug/_topic.json`
- **Content Structure:**
  ```json
  {
    "title": "My Topic Title",
    "description": "A short, engaging description of this topic.",
    "order": 3
  }
  ```

### 2. Adding a New Series (Tier 2)
To create a series inside a topic, create a subfolder in that topic and place a `_series.json` metadata file inside it.

- **Path:** `src/content/blog/my-topic-slug/my-series-slug/_series.json`
- **Content Structure:**
  ```json
  {
    "title": "My Series Title",
    "description": "An explanation of the learning path covered in this series.",
    "order": 1
  }
  ```

### 3. Adding a New Blog Post (Tier 3)
Create a Markdown (`.md`) or MDX (`.mdx`) file. The file should go under a series folder (for series posts) or directly under the topic folder (for direct posts).

#### Option A: Inside a Series
- **Path:** `src/content/blog/my-topic-slug/my-series-slug/part-1.md`
- **Frontmatter:**
  ```markdown
  ---
  title: "Part 1: My Sub-Topic Title"
  description: "A description of this specific article."
  pubDate: 2026-07-18
  tags: ["tutorial", "guide"]
  ---
  ```

#### Option B: Direct Topic Post (No Series)
- **Path:** `src/content/blog/my-topic-slug/direct-article.md`
- **Frontmatter:**
  ```markdown
  ---
  title: "A Direct Article Under My Topic"
  description: "A description of this specific article."
  pubDate: 2026-07-18
  tags: ["insight", "discussion"]
  ---
  ```

---

## Deploying to GitHub Pages

The project contains a GitHub Actions workflow that automatically builds and deploys your site on every push to the `main` branch.

### Initial Configuration Settings
To enable deployment, configure your GitHub repository settings once:

1. Go to your repository on GitHub.
2. Navigate to **Settings** &rarr; **Pages**.
3. Under **Build and deployment**, look for **Source**.
4. Change the dropdown menu selection from *Deploy from a branch* to **GitHub Actions**.

Once this setting is changed, pushing to the `main` branch will automatically run the deploy pipeline and publish the site!
