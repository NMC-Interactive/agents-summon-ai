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
install_command: "git clone https://github.com/NMC-Interactive/agent-orchestrator.git && ln -s $(pwd)/agent-orchestrator/skills/agent-orchestrator ~/.openclaw/skills/agent-orchestrator"
screenshot: "/agents/ao-dashboard.png"
logo: "/agents/ao-dashboard-logo.svg"
published: 2024-02-10
updated: 2024-02-10
---

## Quick Start for Developers

If you just want the dashboard binary:

```bash
# Download and install (macOS/Linux)
curl -L https://github.com/NMC-Interactive/agent-orchestrator/releases/latest/download/ao-dashboard-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m) -o ao-dashboard
chmod +x ao-dashboard
sudo mv ao-dashboard /usr/local/bin/

# Or use Go
go install github.com/NMC-Interactive/agent-orchestrator/cmd/ao-dashboard@latest
```

---

## For OpenClaw Users (Recommended)

**Let OpenClaw set this up for you.** Run this in your OpenClaw chat:

```
Clone https://github.com/NMC-Interactive/agent-orchestrator and link the skill for me
```

OpenClaw will:
1. Clone the repository to your workspace
2. Link the skill to `~/.openclaw/skills/agent-orchestrator`
3. Confirm the dashboard is ready to use

Once linked, you can control everything via chat:

```
/ao start                    # Launch dashboard
/ao spawn builder codex      # Start implementation
/ao spawn reviewer claude    # Parallel review
/ao status                   # Check what's running
```

---

## What is Agent Orchestrator?

It's two things that work together:

1. **Dashboard** — A terminal UI showing all your agents at once
2. **Skill** — Chat commands (`/ao`) that control the dashboard through OpenClaw

You can use the dashboard alone. But with OpenClaw, you get chat-based control—spawn agents, check status, retry failures, all without leaving your conversation.

---

## Using the Skill

Once installed (via OpenClaw or manual), these commands work in any OpenClaw session:

| Command | What It Does |
|---------|--------------|
| `/ao start` | Launch the dashboard in daemon mode |
| `/ao spawn <name> <agent>` | Start a new agent session |
| `/ao status` | Show running/completed/failed counts |
| `/ao kill <session>` | Stop a running session |
| `/ao retry <session>` | Retry a failed session |
| `/ao clear-failed` | Clean up failed sessions |

### Example Workflow

```
You: /ao start
Clawdbot: Dashboard running. 0 active sessions.

You: /ao spawn architect claude
Clawdbot: Spawned architect (claude). Status: running.

You: Design the API for a user service
[Claude works in background]

You: /ao spawn builder codex
Clawdbot: Spawned builder (codex). Status: running.

You: /ao status
Clawdbot: Running: 2 | architect (claude) - 8 turns | builder (codex) - 3 turns

You: /ao spawn reviewer claude
Clawdbot: Spawned reviewer (claude). Waiting for builder...
```

The reviewer waits automatically. When builder finishes, reviewer starts with fresh context.

---

## When to Use Which Agent

| Task | Agent | Why |
|------|-------|-----|
| Architecture & design | Claude | Thinks through trade-offs, asks good questions |
| Implementation & refactoring | Codex | Fast, follows patterns, doesn't overthink |
| Legacy code analysis | Kimi | 1M token context swallows entire repos |
| Security review | Claude (fresh) | Second instance, no shared bias |
| Experiments | OpenCode | Hackable, inspectable, yours |

---

## The Dashboard (Terminal UI)

The skill controls a terminal dashboard that looks like this:

```bash
┌─ Agent Orchestrator ─────────────────────────┐
│ Running: 3 | Completed: 12 | Failed: 0       │
├──────────────────────────────────────────────┤
│ architect   │ claude  │ running │ 8 turns    │
│ builder     │ codex   │ running │ 12 turns   │
│ reviewer    │ claude  │ waiting │ 0 turns    │
└──────────────────────────────────────────────┘

Keys: (r)efresh  (:)command  (T)retry  (C)clear  (q)uit
```

**Key features:**
- **Static UI** — Press `r` to refresh. No distracting auto-updates.
- **Activity log** — See what changed without noise.
- **Auto-compact** — Rotates context at 10 turns to prevent drift.
- **Cross-platform** — macOS, Linux, Windows, WSL.

---

## Installing the Dashboard (Manual)

If you didn't use OpenClaw to set this up:

### Option 1: Download Binary
```bash
# macOS
curl -L https://github.com/NMC-Interactive/agent-orchestrator/releases/latest/download/ao-dashboard-darwin-amd64 -o ao-dashboard
chmod +x ao-dashboard
sudo mv ao-dashboard /usr/local/bin/

# Linux
curl -L https://github.com/NMC-Interactive/agent-orchestrator/releases/latest/download/ao-dashboard-linux-amd64 -o ao-dashboard
chmod +x ao-dashboard
sudo mv ao-dashboard /usr/local/bin/

# Windows
# Download from: https://github.com/NMC-Interactive/agent-orchestrator/releases/latest
```

### Option 2: Go Install
```bash
go install github.com/NMC-Interactive/agent-orchestrator/cmd/ao-dashboard@latest
```

### Option 3: Build from Source
```bash
git clone https://github.com/NMC-Interactive/agent-orchestrator.git
cd agent-orchestrator
go build -o bin/ao-dashboard ./cmd/ao-dashboard
sudo mv bin/ao-dashboard /usr/local/bin/
```

---

## Using the Dashboard (Standalone)

Without OpenClaw, you run the dashboard directly:

```bash
# First-time setup
ao-dashboard --init

# Start daemon
ao-dashboard --daemon

# In another terminal, spawn agents
ao spawn architect claude
ao spawn builder codex
```

**Dashboard keys:**
- `r` — Refresh status
- `:` — Command mode (type `kill architect` or `retry builder`)
- `C` — Clear all sessions
- `T` — Retry all failed
- `?` — Help
- `q` — Quit

---

## What's in the Repository?

```
agent-orchestrator/
├── cmd/ao-dashboard/        # Dashboard binary source
├── skills/
│   └── agent-orchestrator/
│       └── SKILL.md         # This skill definition
├── scripts/
│   ├── install.sh           # Unix installer
│   └── install.ps1          # Windows installer
└── README.md                # Full documentation
```

**Two parts:**
- `cmd/ao-dashboard/` — The Go binary (dashboard)
- `skills/agent-orchestrator/` — The OpenClaw skill (`/ao` commands)

You can use either independently. Together, they give you chat-based control of your agent swarm.

---

## Requirements

- **Dashboard**: macOS, Linux, Windows, or WSL. No Docker.
- **Skill**: OpenClaw (Clawdbot) installed and running.
- **Optional**: Go 1.21+ (if building from source).

---

## Next Steps

1. **OpenClaw users**: Run `/clone https://github.com/NMC-Interactive/agent-orchestrator and link the skill for me`
2. **Developers**: Download binary or `go install`
3. **Read more**: [What is Agent Orchestrator?](/blog/what-is-agent-orchestrator)

---

**License:** MIT  
**Repository:** [github.com/NMC-Interactive/agent-orchestrator](https://github.com/NMC-Interactive/agent-orchestrator)  
**Questions?** Open an issue on GitHub or ask in OpenClaw chat.
