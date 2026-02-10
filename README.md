# agents.summon-ai.com

Landing page and blog for Summon AI agents and skills.

## Tech Stack

- **Framework:** Astro 4.x
- **Styling:** Tailwind CSS
- **Content:** Markdown/MDX with Content Collections
- **Design System:** Matches summon-ai-doc (Starlight-inspired)

## Project Structure

```
agents-summon-ai/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AgentCard.tsx     # Agent listing card with voting
│   │   ├── VoteButtons.tsx   # Upvote/downvote component
│   │   ├── TopicCluster.tsx  # Related blog posts
│   │   └── InstallCommand.tsx # Copy-paste install commands
│   ├── content/
│   │   ├── agents/           # Agent documentation
│   │   ├── skills/           # Skill documentation
│   │   └── blog/             # Blog posts
│   ├── layouts/
│   │   ├── Base.astro        # Base layout
│   │   ├── Agent.astro       # Agent detail page
│   │   └── Blog.astro        # Blog post layout
│   └── pages/
│       ├── index.astro       # Homepage (voting list)
│       ├── agents/[slug].astro
│       ├── skills/[slug].astro
│       ├── blog/[slug].astro
│       └── blog/index.astro
├── public/
│   └── agents/               # Agent screenshots/logos
└── astro.config.mjs
```

## Content Schema

### Agent/Skill Frontmatter
```yaml
---
title: "Agent Orchestrator"
description: "Live dashboard for managing AI agent swarms"
author: "river"
category: "orchestration"
tags: ["dashboard", "monitoring", "multi-agent"]
repo: "https://github.com/river/agent-orchestrator"
downloads: 1234
rating: 4.8
votes: 156
featured: true
install_command: "curl -fsSL https://get.ao-dashboard.dev | bash"
---
```

### Blog Post Frontmatter
```yaml
---
title: "Building a Live Agent Dashboard"
description: "How we built the AO Dashboard with Bubble Tea"
author: "river"
published: 2024-02-10
category: "tutorial"
tags: ["go", "bubble-tea", "tui"]
related_agents: ["agent-orchestrator"]
related_skills: []
---
```

## Features

### 1. Homepage (Reddit/Quora Style)
- Sortable agent/skill listings
- Upvote/downvote system
- Filtering by category/tags
- Featured/top-rated section

### 2. Agent/Skill Detail Pages
- Hero with title, description, install command
- Feature breakdown with screenshots
- OpenClaw installation instructions
- Related blog posts (topic cluster)
- GitHub repo link

### 3. Blog
- MDX support for interactive components
- Topic clusters linked to agents
- Author attribution
- Related posts

## Domain Strategy

- **Main:** agents.summon-ai.com
- **CDN:** Static hosting (Cloudflare Pages/Vercel)
- **Analytics:** Plausible or Fathom

## Installation

```bash
git clone https://github.com/river/agents-summon-ai
cd agents-summon-ai
npm install
npm run dev
```
