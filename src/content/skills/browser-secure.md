---
title: "Browser Secure"
description: "Secure browser automation with Chrome profile support, vault integration, approval gates, and comprehensive audit logging"
author: "NMC Interactive"
category: "security"
tags: ["browser", "security", "vault", "bitwarden", "1password", "automation", "chrome", "audit", "playwright"]
repo: "https://github.com/NMC-Interactive/browser-secure"
downloads: 0
rating: 0
votes: 0
featured: false
install_command: "git clone https://github.com/NMC-Interactive/browser-secure.git && cd browser-secure && npm install && npm run build && npm link"
compatible_agents: ["clawdbot", "openclaw"]
published: 2026-02-11
updated: 2026-02-11
---

## For 🦞OpenClaw Clawdbot Users (Recommended)

**Let 🦞OpenClaw Molty set this up for you.** Run this prompt in your OpenClaw chat:

```
Clone https://github.com/NMC-Interactive/browser-secure and install the skill for me
```

OpenClaw will:
1. Clone the repository to your workspace
2. Run `npm install && npm run build && npm link`
3. Verify the CLI is available globally as `browser-secure`

Once installed, you can use it immediately:

```
navigate to https://example.com and take a screenshot
```

---

## Quick Start

```bash
# Navigate to a public site (no vault needed)
browser-secure navigate https://example.com

# List available Chrome profiles
browser-secure navigate https://example.com --list-profiles

# Navigate using a specific Chrome profile (with your cookies/logins)
browser-secure navigate https://github.com --profile "Profile 1"

# Or select profile interactively
browser-secure navigate https://github.com --profile select

# Navigate with auto-vault credential discovery (interactive)
browser-secure navigate https://app.neilpatel.com/ --auto-vault

# Navigate to an authenticated site (pre-configured)
browser-secure navigate https://nytimes.com --site=nytimes

# Perform actions
browser-secure act "click the login button"
browser-secure extract "get the article headlines"

# Close and cleanup
browser-secure close
```

---

## What is Browser Secure?

**Philosophy:** *"Never trust, always verify, encrypt everything, audit all actions"*

Unlike traditional browser automation that stores credentials in plain text or environment variables, Browser Secure keeps your passwords encrypted in your vault until the exact moment they're needed. No passwords in CLI history, no credentials in logs, no plaintext in memory longer than necessary.

### The Problem with Traditional Automation

Most browser automation tools handle credentials like this:

```bash
# ❌ BAD: Credentials in CLI (visible in history)
my-tool login --username="user@example.com" --password="secret123"

# ❌ BAD: Credentials in environment variables (leaked to child processes)
export PASSWORD="secret123"
my-tool login

# ❌ BAD: Credentials in config files (plaintext on disk)
cat config.json
{ "password": "secret123" }
```

### The Browser Secure Approach

```bash
# ✅ GOOD: No credentials in CLI
browser-secure navigate https://github.com --site=github

# Credentials flow:
# 1. You authenticate to your vault (Bitwarden/1Password) once per session
# 2. Vault stays encrypted at rest
# 3. When needed, credentials are retrieved via secure API
# 4. Used immediately, then cleared from memory
# 5. Session timeout auto-clears everything (30 min default)
```

---

## Key Features

| Feature | Protection |
|---------|------------|
| **🔐 Vault Integration** | Credentials never leave encrypted vault until needed |
| **👤 Chrome Profile Support** | Use existing profiles with cookies and logins |
| **🛡️ Approval Gates** | Tiered approval system for sensitive actions |
| **📊 Audit Logging** | Immutable logs with SHA-256 chain hashing |
| **⏱️ Session Timeouts** | Auto-cleanup after 30 minutes (configurable) |
| **🔒 Network Restrictions** | Blocks localhost/private IPs to prevent pivot attacks |
| **📝 Auto-Vault Discovery** | Interactive credential discovery from your password manager |

---

## Why Browser Secure?

| Feature | Traditional Automation | Browser Secure |
|---------|----------------------|----------------|
| Credentials | CLI args / env vars / plaintext | Vault-backed, encrypted |
| Chrome Profiles | ❌ No | ✅ Yes (with cookies/logins) |
| Approval | None | Tiered gates |
| Audit | None | Full trail with chain hashing |
| Session timeout | None | 30 min default |
| Network | Unrestricted | Allow-list |

---

## Security Model

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER REQUEST                                │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. PROFILE SELECTION                                           │
│     • Use isolated automation profile OR                        │
│     • Use incognito mode (no persistence)                       │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. VAULT AUTHENTICATION                                        │
│     • Unlock Bitwarden: export BW_SESSION=$(bw unlock --raw)    │
│     • Unlock 1Password: eval $(op signin)                       │
│     • Vault remains encrypted at rest                           │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. APPROVAL GATE                                               │
│     • Read-only actions: Navigate, screenshot, extract          │
│     • Form fill: Click, type, select (prompts for approval)     │
│     • Authentication: fill_password, submit_login (always ask)  │
│     • Destructive: delete, purchase (requires 2FA if enabled)   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. ISOLATED SESSION                                            │
│     • Time-bounded (30 min default, auto-expiry)                │
│     • Isolated work directories (UUID-based)                    │
│     • Network restrictions (block localhost/private IPs)        │
│     • Secure cleanup (overwrite + delete)                       │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. AUDIT LOG                                                   │
│     • Immutable logs with SHA-256 chain hashing                 │
│     • Tamper-evident: any modification breaks chain             │
│     • Retention: 30 days (configurable)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Chrome Profile Isolation

Using a dedicated automation profile protects you in multiple ways:

| Aspect | Personal Profile | Automation Profile |
|--------|------------------|-------------------|
| **Extensions** | All your personal extensions | Only automation extensions (Bitwarden, Browser Relay) |
| **Cookies** | Personal logins, shopping, social media | Only automation-targeted sites |
| **History** | Personal browsing history | Automation session history only |
| **Security** | Linked to your personal Google account | Isolated, no personal data |
| **Cleanup** | Manual | Automatic session timeout + secure deletion |

**Scenario:** If a malicious script runs during automation:
- With personal profile: Could access your Gmail, banking cookies, personal data
- With automation profile: Only sees automation-targeted sites, no personal data

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `browser-secure profile --create "Name"` | Create new Chrome profile with welcome page |
| `browser-secure profile --create "Name" --launch` | Create profile and launch Chrome |
| `browser-secure profile --list` | List all Chrome profiles |
| `browser-secure navigate <url>` | Open URL, optionally with profile or authentication |
| `browser-secure navigate <url> --profile <id>` | Use specific Chrome profile |
| `browser-secure navigate <url> --profile select` | Interactively choose Chrome profile |
| `browser-secure navigate <url> --list-profiles` | List available Chrome profiles |
| `browser-secure navigate <url> --site=<name>` | Use pre-configured site credentials |
| `browser-secure navigate <url> --auto-vault` | Auto-discover credentials from vault |
| `browser-secure act "<instruction>"` | Perform natural language action |
| `browser-secure extract "<instruction>"` | Extract data from page |
| `browser-secure screenshot` | Take screenshot |
| `browser-secure close` | Close browser and cleanup |
| `browser-secure status` | Show session status |
| `browser-secure audit` | View audit logs |

---

## Vault Providers

### Bitwarden (Recommended - Free)

Free, open-source, cross-platform. Best choice for most users.

```bash
# Install CLI
brew install bitwarden-cli

# Login
bw login
export BW_SESSION=$(bw unlock --raw)

# Use
browser-secure navigate https://github.com --auto-vault
```

### 1Password (Paid)

If you already have a 1Password subscription.

```bash
# Install CLI
brew install 1password-cli

# Login
op signin
eval $(op signin)

# Use
browser-secure navigate https://github.com --auto-vault
```

### macOS Keychain (Local)

Store credentials locally (no cloud sync). Good for single-machine use.

### Environment Variables (Emergency Fallback)

```bash
export BROWSER_SECURE_GITHUB_USERNAME="user@example.com"
export BROWSER_SECURE_GITHUB_PASSWORD="secret"
browser-secure navigate https://github.com --site=github
```

---

## Troubleshooting

**"Vault is locked" error**
```bash
# Bitwarden
export BW_SESSION=$(bw unlock --raw)

# 1Password
eval $(op signin)
```

**Chrome keychain prompt on first run**
This is normal! When Playwright launches Chrome, macOS asks about keychain access. You can click "Deny" since Browser Secure manages credentials through your vault, not Chrome's built-in storage.

**Profile not found**
```bash
browser-secure profile --list  # See available profiles
browser-secure profile --create "My Profile"  # Create new one
```

**Session expired**
Default 30-minute TTL. Restart with `--timeout 3600` for longer sessions (in seconds).

**Approval required for every action**
Use `-y` flag to auto-approve (be careful!): `browser-secure act "click login" -y`

---

## Configuration

Create `~/.browser-secure/config.yaml`:

```yaml
vault:
  provider: bitwarden  # Options: bitwarden, 1password, keychain, env
  
  # Pre-configured site credentials
  sites:
    github:
      vault: "Personal"
      item: "GitHub"
      usernameField: "username"
      passwordField: "password"
    
    nytimes:
      vault: "News"
      item: "NYT Account"
      usernameField: "email"

security:
  sessionTimeoutMinutes: 30
  credentialCacheMinutes: 10
  requireApprovalFor:
    - fill_password
    - submit_login
  blockLocalhost: true
  auditScreenshots: true

audit:
  enabled: true
  retentionDays: 30
```

---

## Documentation

- [Full Documentation](https://github.com/NMC-Interactive/browser-secure#readme)
- [OpenClaw Documentation](https://docs.openclaw.ai)

---

**License:** MIT  
**Repository:** [github.com/NMC-Interactive/browser-secure](https://github.com/NMC-Interactive/browser-secure)  
**Questions?** Open an issue on GitHub or ask in OpenClaw chat.
