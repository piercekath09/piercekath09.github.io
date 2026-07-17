---
title: "Prompt Engineering 101"
description: "A complete guide to prompt engineering techniques including zero-shot, few-shot, and Chain-of-Thought prompting."
pubDate: 2026-07-15
tags: ["llm", "prompts", "engineering"]
---

Prompt engineering is the practice of structuring text that can be interpreted and understood by a generative AI model. It is a crucial skill for building applications on top of Large Language Models (LLMs).

## Core Techniques

### 1. Zero-shot Prompting
Asking the model a question without providing any examples:

```text
Translate this sentence into French: "Hello, how are you?"
```

### 2. Few-shot Prompting
Providing examples of the desired input/output format before asking the model to complete a new example:

```text
Input: Happy -> Output: Positive
Input: Sad -> Output: Negative
Input: Excited -> Output: Positive
Input: Tired -> Output:
```

### 3. Chain-of-Thought (CoT) Prompting
Asking the model to show its reasoning steps before providing the final answer. This is extremely effective for reasoning, arithmetic, and logic tasks.

> **Example CoT:**
> Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?
> A: Roger started with 5 balls. 2 cans of 3 balls each is 6 balls. 5 + 6 = 11. The answer is 11.
