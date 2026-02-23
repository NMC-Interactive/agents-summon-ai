---
title: "Deep Analyst"
description: "Multi-round competitive analysis agent that produces long-form structured reports with deep market intelligence"
author: "river"
category: "research"
tags: ["analysis", "competitive", "research", "strategy", "market-intelligence"]
repo: "https://github.com/NMC-Interactive/summon-academy"
downloads: 0
rating: 0
votes: 0
featured: true
install_command: "summon install @river/deep-analyst"
published: 2026-02-23
model: "openai/gpt-4o-mini"
rounds: 5
---

## Overview

Deep Analyst is a multi-round competitive analysis agent designed to produce comprehensive, structured reports. It builds layered intelligence across 5 rounds, creating rich output perfect for testing factory event enrichment and gap chat diagnostics.

## Capabilities

- **Market Research**: Deep competitive intelligence with source citations
- **Competitor Profiling**: Structured analysis with comparison matrices
- **Financial Data Lookup**: Specific metrics and data points
- **Structured Output**: Tables, bullet lists, and markdown formatting
- **Source Attribution**: Every claim backed by citations

## Persona

Senior Strategy Analyst — a veteran consultant who has advised Fortune 500 companies on competitive positioning. Specializes in synthesizing market signals into actionable intelligence.

## Usage

```bash
summon run @river/deep-analyst "Analyze Tesla vs BYD market position"
```

## Output Format

- Minimum 800 words per round
- Structured markdown with tables
- Data-backed comparisons
- Citations for all claims
- Layered analysis building on prior rounds

## Guardrails

- Max response length: 4,000 tokens
- Requires sources for all claims
- Quality checklist enforced
- Reflection before tool use
