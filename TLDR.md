# TL;DR - agents.summon-ai.com

## Current Narrative

**What it is:** The public-facing showcase for the Summon AI ecosystem — a discoverability hub where users browse, vote on, and install agents & skills. Think "Product Hunt meets npm registry" for AI agents.

**Purpose:**
1. **Discovery** — Central place to find curated agents/skills
2. **Trust** — Voting system surfaces quality; author attribution builds credibility
3. **Distribution** — One-click install commands for OpenClaw users
4. **Content Marketing** — Blog drives SEO and educates users

**Status:** Live at https://agents.summon-ai.com (GitHub: NMC-Interactive/agents-summon-ai)

---

## Repo Completion Workflow

When a new repo (agent/skill) is ready, execute this checklist:

### Phase 1: Repo Publication
- [ ] Push repo to GitHub
- [ ] Get repo link: `https://github.com/NMC-Interactive/{repo-name}`
- [ ] Ensure README has: what it is, install instructions, usage example

### Phase 2: Listing Creation
- [ ] Determine category: `agent` (autonomous) or `skill` (tool/extension)
- [ ] Create listing item in `src/content/{agents|skills}/{slug}.md`
- [ ] Auto-generate title/description (pull from repo README or package.json)
- [ ] Add frontmatter: title, description, author, category, tags, repo, install_command

### Phase 3: Landing Page
- [ ] Write product-driven landing page covering:
  - The problem it solves
  - What it is (elevator pitch)
  - How to install (copy-paste command)
  - Key features with screenshots
  - OpenClaw integration specifics

### Phase 4: Keyword & SERP-SGE Research
- [ ] Run SERP-SGE analysis on target keywords
- [ ] Identify: AI Overview presence, PAA questions, ranking domains, content gaps
- [ ] Propose 3-5 article topics aligned with findings
- [ ] **→ User approval required before writing**

### Phase 5: Content Production
Once approved:
- [ ] Write articles matching River's writing style (check `notes/writing-style.md`)
- [ ] Each article links back to the listing page
- [ ] Include install CTAs naturally in content

### Phase 6: Publication
- [ ] Publish to `src/content/blog/`
- [ ] Push to repo
- [ ] Verify articles go live on agents.summon-ai.com/blog

---

## Content Inventory

### Current Agents
*None listed yet*

### Current Skills
| Skill | Category | Repo | Blog Posts |
|-------|----------|------|------------|
| Agent Orchestrator | orchestration | river/agent-orchestrator | "Building a Live Agent Dashboard" |

### Current Blog Posts
| Title | Date | Related Skill/Agent |
|-------|------|---------------------|
| Building a Live Agent Dashboard | 2025-02-10 | Agent Orchestrator |

---

## Open Questions / TODOs

1. **Automation:** Can we auto-generate listings from GitHub repo metadata?
2. **Voting:** Is the upvote/downvote system wired to a backend or static for now?
3. **Analytics:** Plausible/Fathom set up yet?
4. **Domain:** Currently on Cloudflare Pages? Verify deployment pipeline.

---

*Last updated: 2026-02-11*
