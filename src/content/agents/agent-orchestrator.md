---
title: "Agent Orchestrator"
description: "Mix Claude, Codex, Kimi, and more without locking to any IDE. Let Clawdbot orchestrate and work perfectly with OpenClaw ecosystem."
author: "river"
category: "orchestration"
tags: ["dashboard", "monitoring", "multi-agent", "tui", "bubble-tea", "go", "claude-code", "codex-cli", "kimi-cli"]
repo: "https://github.com/NMC-Interactive/agent-orchestrator"
downloads: 2847
rating: 4.8
votes: 88
featured: true
install_command: "curl -fsSL https://get.ao-dashboard.dev | bash"
screenshot: "/agents/ao-dashboard.png"
logo: "/agents/ao-dashboard-logo.svg"
published: 2024-02-10
updated: 2024-02-10
---

## The Problem with Picking One

Every AI coding tool has strengths. Claude Code thinks deeply about architecture. Codex CLI moves fast on implementation. Kimi CLI 2.5 handles context windows that would choke most models. OpenCode lets you hack on the agent itself.

But here's the friction: most workflows force you to pick **one** and shoehorn everything through it.

I spent months bouncing between them. Cursor and other web tools are good, but I end up using Claude code cli for the big-picture and majority of development stuff,  but claude code debug works are nightmare to me, that I spent a lot of time back and forth, until codex of OpenAI being introduced.  Then switching to Codex when I needed a more precise model and speed to answers.  At the same time, I keep using Claude for planning and quality review, when the refactoring got complex. Each switch meant has a cost of losing context. Each switch meant paying for the premium tier of yet another IDE just to get the model I wanted.

The "one IDE to rule them all" approach sounds nice in theory. In practice, it means compromises.

## Use the Right Model for the Task

Agent Orchestrator started as a personal tool a week ago when I started using Clawdbot.  It made my life much easier with its unique context management.  I feel so much relief when I start developing the agent-orchetrator skill, which spawn and run multiple agents at the same time.  The idea is simple: run agents in parallel from a single terminal dashboard. Each agent gets its own isolated context. No cross-contamination. No "one model trying to do everything."  I enjoy a lot.  Hope you feel the same way I do.

```bash
# Start the dashboard
ao-dashboard --daemon

# Spawn specialized agents
ao spawn architect claude     # Design the API
ao spawn builder codex        # Implement endpoints  
ao spawn reviewer claude      # Review the PR
```

The dashboard shows what's running, what's waiting, and what failed. You decide when to refresh. You decide when to retry. The agents do the work; you stay in control.

## Built for Terminal Workflows

I'm an introvert who lives in the terminal. The last thing I want is another electron app buzzing with notifications.

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

- **Static UI** — No distracting auto-refresh. Press `r` when you want updates, not when the app decides to show them.
- **Activity log** — See what changed without verbose noise. Just the facts.
- **Compact mode** — Auto-rotate context at 10 turns. Prevents the gradual drift that happens when an agent talks too long.

## When to Use Which

This isn't about replacing your favorite tool. It's about not being stuck with it when another tool would be better.

| Situation | What Works |
|-----------|------------|
| Greenfield architecture | Claude — thinks through trade-offs, asks clarifying questions |
| Fast implementation | Codex — follows patterns, doesn't overthink |
| Legacy codebase archaeology | Kimi — 1M token context swallows entire repos |
| Security-critical review | Second Claude instance — fresh eyes, no shared context |
| Experimental workflows | OpenCode — hackable, inspectable, yours |

The dashboard doesn't judge your choices. It just makes them possible without friction.

## Native OpenClaw Integration

If you use OpenClaw (and if you're reading this, you probably do), the integration is seamless:

```bash
# From any OpenClaw session
/ao start                    # Launch dashboard
/ao spawn builder codex      # Start implementation
/ao spawn reviewer claude    # Parallel review
```

Agents communicate through Clawdbot. You stay in your chat interface. They work in the background. When something needs your attention, you hear about it. When everything's running smoothly, you don't.

## Installation

One line:

```bash
curl -fsSL https://get.ao-dashboard.dev | bash
```

Or build from source if you prefer:

```bash
git clone https://github.com/NMC-Interactive/agent-orchestrator
cd agent-orchestrator
go build -o bin/ao-dashboard ./cmd/ao-dashboard
```

Requirements: macOS, Linux, Windows, or WSL. No Docker. No cloud dependencies. Just a terminal.

## Quick Start

```bash
# Interactive TUI mode
ao-dashboard --daemon

# Keys while running:
r     # Refresh status
:     # Enter command mode (type 'kill architect' or 'retry builder')
C     # Clear all sessions
T     # Retry all failed
?     # Help
q     # Quit
```

## What This Isn't

- Not an IDE. It doesn't edit code; it manages the agents that do.
- Not a replacement for Claude Code, Codex, or Kimi. It works alongside them.
- Not autonomous in the sci-fi sense. You decide what runs when.

## The Philosophy

AI tools are getting good. But "good" is contextual. Claude's strength is depth; Codex's is speed; Kimi's is scale. Locking yourself to one means accepting its weaknesses along with its strengths.

Agent Orchestrator is my answer to that: a thin layer that lets each tool do what it does best, without the context-switching tax.

If that resonates, give it a try.

---

**License:** MIT  
**Repository:** [github.com/NMC-Interactive/agent-orchestrator](https://github.com/NMC-Interactive/agent-orchestrator)
