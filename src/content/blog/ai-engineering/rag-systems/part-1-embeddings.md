---
title: "Part 1: Understanding Vector Embeddings"
description: "How text is converted into high-dimensional vectors that capture semantic meaning for semantic search."
pubDate: 2026-07-16
tags: ["embeddings", "rag", "vector-search"]
---

Vector embeddings are numerical representations of concepts, words, or documents in a high-dimensional vector space. They are the foundation of modern search, recommendation, and Retrieval-Augmented Generation (RAG) systems.

## What is an Embedding?

An embedding is a vector (a list of numbers) representing a piece of text. The key property of embeddings is that text pieces that are semantically similar (close in meaning) will be close to each other in the vector space.

For example, the vectors for:
- "The king sat on his throne"
- "A royal leader ruled from his seat"

Will have a high similarity score, whereas:
- "Bananas are yellow fruit"

Will be very far away in the vector space.

## How to Calculate Embeddings

Most developers use pre-trained embedding models via API or run them locally:

```javascript
// Example using OpenAI's embedding API
const response = await fetch("https://api.openai.com/v1/embeddings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    input: "Retrieval-Augmented Generation",
    model: "text-embedding-3-small"
  })
});
```

In the next part, we will explore how to store these vectors in a Vector Database for fast retrieval.
