---
title: "Astro Performance Tips for Modern Sites"
description: "How to leverage Astro's island architecture and static output modes to achieve perfect PageSpeed scores."
pubDate: 2026-07-18
tags: ["astro", "performance", "frontend"]
---

Astro was built from the ground up for speed. By delivering zero client-side JavaScript by default, Astro lets you build high-performance websites that rank exceptionally well on search engines and load instantly.

## 1. Leverage the Island Architecture

Astro's defining feature is **Astro Islands** (also known as component islands). Rather than rendering your entire site as a monolithic JavaScript bundle (like traditional Single Page Apps), Astro renders the entire page to static HTML on the server.

If a component needs client-side interactivity, you mark it using a `client:*` directive:

```astro
<!-- Renders static HTML on the server -->
<Header />

<!-- Renders static HTML and hydrates on client load -->
<InteractiveCarousel client:load />

<!-- Hydrates only when the component is visible in viewport -->
<HeavyChart client:visible />
```

## 2. Optimize Images

Always use Astro's built-in `<Image />` component for automatic format conversion, sizing, and lazy loading:

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.png';
---

<Image src={myImage} alt="Optimized image representation" width={800} />
```

By specifying layout requirements and lazy-loading non-critical resources, you keep CLS (Cumulative Layout Shift) at zero and keep LCP (Largest Contentful Paint) times minimal.
