---
title: "What is Agent Orchestrator?"
description: "A terminal dashboard for running multiple AI agents in parallel. Mix Claude, Codex, and Kimi without locking into a single IDE."
published: 2026-02-11
author: river
category: "tools"
tags: ["agent-orchestrator", "multi-agent", "claude-code", "codex-cli", "kimi-cli", "tutorial"]
featured: true
related_skills: ["agent-orchestrator"]
related_agents: []
---

# What is Agent Orchestrator?

Agent Orchestrator is a terminal dashboard for running multiple AI agents side by side. Instead of being locked into one IDE or one model, you can spawn specialized agents for different tasks—Claude for architecture, Codex for implementation, Kimi for long-context analysis—and see them all in one place.

## Why I Built This

I spent months bouncing between AI coding tools. Claude Code became my go-to for architecture. Codex CLI became my implementation tool. Kimi surprised me with that 1M token context window.

But each switch meant context loss. Each meant paying for another premium IDE tier. The "one IDE to rule them all" approach sounds nice, but in practice it means compromises.

Agent Orchestrator removes that friction. Run agents in parallel from a single terminal dashboard. Each gets its own isolated context. No cross-contamination.

## How It Works

```bash
# Start the dashboard
ao-dashboard --daemon

# Spawn specialized agents
ao spawn architect claude     # Design the API
ao spawn builder codex        # Implement endpoints  
ao spawn reviewer claude      # Review the PR
```

The dashboard shows what's running, what's waiting, and what failed. You decide when to refresh. You decide when to retry.

## Built for Terminal Workflows

```bash
┌─ Agent Orchestrator ─────────────────────────┐
│ Running: 3 | Completed: 12 | Failed: 0       │
├──────────────────────────────────────────────┤
│ architect   │ claude  │ running │ 4 turns    │
│ builder     │ codex   │ running │ 12 turns   │
│ reviewer    │ claude  │ waiting │ 0 turns    │
└──────────────────────────────────────────────┘

Keys: (r)efresh  (:)command  (T)retry  (C)clear  (q)uit
```

Some deliberate choices:

- **Static UI** — No distracting auto-refresh. Press `r` when you want updates.
- **Activity log** — See what changed without verbose noise.
- **Compact mode** — Auto-rotate context at 10 turns to prevent drift.

## When to Use Which

| Situation | What Works |
|-----------|------------|
| Greenfield architecture | Claude — thinks through trade-offs |
| Fast implementation | Codex — follows patterns, moves fast |
| Legacy codebase archaeology | Kimi — 1M token context |
| Security-critical review | Second Claude instance — fresh eyes |
| Experimental workflows | OpenCode — hackable, inspectable |

## Philosophy

AI tools are getting good. But "good" is contextual. Claude's strength is depth; Codex's is speed; Kimi's is scale. Locking yourself to one means accepting its weaknesses.

Agent Orchestrator is a thin layer that lets each tool do what it does best, without the context-switching tax.

If that resonates, [try it out](/skills/agent-orchestrator).

---

*Part of the [Summon AI](/) ecosystem. Built for developers who'd rather configure than compromise.*
