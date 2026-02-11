---
title: "The Complete Guide to Chrome Profile Automation with Playwright"
description: "How to use existing Chrome profiles with Playwright for persistent sessions, saved logins, and secure automation workflows"
author: "NMC Interactive"
published: 2026-02-11
category: "tutorial"
tags: ["playwright", "chrome", "browser automation", "profiles", "persistent context"]
featured: false
related_skills: ["browser-secure"]
---

# The Complete Guide to Chrome Profile Automation with Playwright

> Stop re-authenticating every session. Use your existing Chrome profiles—with all their cookies, extensions, and saved logins—for seamless automation.

Playwright's default behavior is **isolated by design**. Every browser launch starts fresh: no cookies, no localStorage, no extensions. This is great for testing. It's terrible for automation.

If you're automating a workflow that requires authentication, you have two options:

1. **Re-authenticate every time** — Slow, brittle, CAPTCHA-prone
2. **Use a persistent Chrome profile** — Fast, reliable, maintains state

This guide covers option 2—the right way.

## Why Chrome Profiles Matter

### The Problem: Stateless Automation

```javascript
// Default Playwright - fresh context every time
const { chromium } = require('playwright');

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

await page.goto('https://github.com/login');
// You are NOT logged in. Every. Single. Time.
```

For testing, this is correct. For automation, it's painful.

### The Solution: Persistent Context

```javascript
// Use existing Chrome profile
const browser = await chromium.launchPersistentContext(
  '/Users/river/Library/Application Support/Google/Chrome',
  { channel: 'chrome' }
);
// You're already logged in to whatever sites your profile knows
```

This launches Chrome with **your actual profile**—cookies, extensions, saved passwords, session state, and all.

## Finding Your Chrome Profile Path

Before you can use a profile, you need its path.

### macOS

```bash
# Default profile
~/Library/Application Support/Google/Chrome

# Named profiles
~/Library/Application Support/Google/Chrome/Profile 1
~/Library/Application Support/Google/Chrome/Profile 2
```

### Windows

```bash
# Default profile
C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data

# Named profiles
C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Profile 1
```

### Linux

```bash
# Default profile
~/.config/google-chrome

# Named profiles
~/.config/google-chrome/Profile 1
```

### Quick Check

Open Chrome and type `chrome://version` in the address bar. Look for **"Profile Path"**:

```
Profile Path: /Users/river/Library/Application Support/Google/Chrome/Default
```

The parent directory (everything *before* `/Default`) is your **user data directory**.

## Launching with Persistent Context

### Basic Example

```javascript
const { chromium } = require('playwright');

(async () => {
  // Launch with your Chrome profile
  const context = await chromium.launchPersistentContext(
    '/Users/river/Library/Application Support/Google/Chrome',
    {
      channel: 'chrome',  // Use installed Chrome, not bundled Chromium
      headless: false     // Must be false for profile access
    }
  );
  
  const page = context.pages()[0];  // Profile may open existing tabs
  await page.goto('https://github.com');
  
  // If you were logged in to GitHub, you still are
  console.log(await page.title());
  
  await context.close();
})();
```

### With Specific Profile

If you have multiple Chrome profiles, specify one:

```javascript
const context = await chromium.launchPersistentContext(
  '/Users/river/Library/Application Support/Google/Chrome/Profile 1',
  {
    channel: 'chrome',
    headless: false
  }
);
```

### Important Options

| Option | Why It Matters |
|--------|---------------|
| `channel: 'chrome'` | Uses your installed Chrome (with your profiles), not Playwright's bundled Chromium |
| `headless: false` | Required for profile access; Chrome can't access profiles in headless mode |
| `args: ['--disable-blink-features=AutomationControlled']` | Hides automation flags from websites |

## Creating Isolated Automation Profiles

Using your personal Chrome profile for automation is risky. It contains:

- Personal Gmail cookies
- Banking session tokens
- Saved passwords for other sites
- Personal browsing history

If automation scripts go wrong, they can access all of this.

### Better Approach: Dedicated Automation Profile

**Browser Secure** handles this automatically:

```bash
# Create isolated profile with welcome page
browser-secure profile --create "Automation-Work"

# Chrome opens with setup guide:
# 1. Install Bitwarden extension
# 2. Install OpenClaw Browser Relay
# 3. Log in to your vault
# 4. Start automating
```

This creates:
- Clean Chrome profile in `~/.browser-secure/profiles/`
- Custom welcome page with setup instructions
- Isolated from your personal browsing

### Manual Creation

If you prefer to create profiles manually:

```bash
# macOS - create directory structure
mkdir -p ~/.chrome-automation/WorkProfile

# Launch Chrome with this profile
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --user-data-dir="$HOME/.chrome-automation/WorkProfile"
```

Set up the profile once (log in to sites, install extensions), then use it for automation.

## Combining Profiles with Vault Security

Profiles solve the "stay logged in" problem. They don't solve the "secure credentials" problem.

Here's the complete secure workflow:

```bash
# 1. Unlock your vault
export BW_SESSION=$(bw unlock --raw)

# 2. Launch browser with isolated profile
browser-secure navigate https://app.neilpatel.com --profile "Automation-Work" --auto-vault

# 3. Browser Secure auto-discovers credentials from Bitwarden
# 4. Fills them only when needed
# 5. Clears from memory immediately after
```

Benefits:
- ✅ Profile maintains session state
- ✅ Vault protects credentials
- ✅ No passwords in scripts or environment
- ✅ Audit trail of all actions

## Common Patterns

### Pattern 1: Pre-Authenticated Sessions

```javascript
// First run: manually log in
const context = await chromium.launchPersistentContext(
  './automation-profile',
  { channel: 'chrome', headless: false }
);
const page = await context.newPage();
await page.goto('https://dashboard.service.com');
// Manually log in once...
await context.close();

// Subsequent runs: already logged in
const context = await chromium.launchPersistentContext(
  './automation-profile',
  { channel: 'chrome', headless: false }
);
const page = context.pages()[0];
await page.goto('https://dashboard.service.com');
// Already authenticated!
```

### Pattern 2: Multi-Account Workflows

```javascript
// Different profiles for different accounts
const workContext = await chromium.launchPersistentContext(
  './profiles/work',
  { channel: 'chrome' }
);

const personalContext = await chromium.launchPersistentContext(
  './profiles/personal', 
  { channel: 'chrome' }
);

// Work and personal accounts stay separate
```

### Pattern 3: Extension-Enabled Automation

```javascript
// Profile with specific extensions installed
const context = await chromium.launchPersistentContext(
  './profiles/with-bitwarden',
  {
    channel: 'chrome',
    headless: false,
    // Extensions are loaded from the profile
  }
);

// Bitwarden extension is available
// Can auto-fill passwords via extension
```

## Troubleshooting

### "Chrome is already running"

Chrome locks the profile when running. You must close all Chrome windows before using `--profile`.

```bash
# Force quit Chrome on macOS
pkill -f "Google Chrome"

# Then run your automation
```

### Profile changes not persisting

Make sure you're using `launchPersistentContext`, not `launch` + `newContext`.

```javascript
// ❌ Wrong - ephemeral context
const browser = await chromium.launch();
const context = await browser.newContext();  // Won't save anything

// ✅ Right - persistent context
const context = await chromium.launchPersistentContext(
  './profile-path',
  { channel: 'chrome' }
);
```

### Extensions not loading

Extensions only work in headed mode (not headless):

```javascript
// ❌ Won't load extensions
{ headless: true }

// ✅ Extensions work
{ headless: false }
```

### Path issues on Windows

Use double backslashes or forward slashes:

```javascript
// Both work:
'C:\\Users\\Name\\AppData\\Local\\Google\\Chrome'
'C:/Users/Name/AppData/Local/Google/Chrome'
```

## Security Considerations

### Profile Isolation

| Risk | Mitigation |
|------|-----------|
| Personal data exposure | Use dedicated automation profiles |
| Cross-site cookie leakage | Separate profiles per security domain |
| Extension vulnerabilities | Only install necessary extensions |
| Profile corruption | Backup profiles before automation |

### Credential Security

Profiles store cookies/session tokens, not passwords (usually). But compromised profiles still grant access.

**Defense in depth:**
1. Use isolated automation profiles
2. Store actual passwords in vault (Bitwarden/1Password)
3. Enable 2FA on automated accounts
4. Audit automation actions

## When to Use What

| Scenario | Approach |
|----------|----------|
| Testing (CI/CD) | Default ephemeral contexts |
| One-off automation | Personal profile + close Chrome first |
| Regular automation | Dedicated automation profile |
| Multi-account | Separate profiles per account |
| Sensitive operations | Profile + vault + approval gates |

## Browser Secure Integration

Instead of managing profiles manually, use Browser Secure:

```bash
# List all profiles
browser-secure profile --list

# Create new profile
browser-secure profile --create "Project-X"

# Use profile with vault-backed auth
browser-secure navigate https://staging.company.com \
  --profile "Project-X" \
  --auto-vault

# Extract data
browser-secure extract "get the quarterly revenue number"

# Close and cleanup
browser-secure close
```

**Key differences from raw Playwright:**
- Automatic profile creation with welcome page
- Vault integration (Bitwarden/1Password)
- Approval gates for sensitive actions
- Audit logging
- Session timeout auto-cleanup

---

## Summary

Chrome profile automation with Playwright gives you:

- ✅ **Persistent sessions** — Stay logged in across runs
- ✅ **Real browser behavior** — Extensions, cookies, localStorage
- ✅ **Multi-account support** — Separate profiles per use case
- ✅ **Faster automation** — Skip re-authentication

But it requires:
- ⚠️ **Profile management** — Don't use personal profiles
- ⚠️ **Security awareness** — Profiles contain session tokens
- ⚠️ **Headed mode** — Can't use headless with profiles

For production automation, combine profiles with vault security and audit logging. Browser Secure handles all three.

---

## Resources

- [Playwright Persistent Context Docs](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-persistent-context)
- [Browser Secure on GitHub](https://github.com/NMC-Interactive/browser-secure)
- [Secure Browser Automation Credentials](/blog/secure-browser-automation-credentials)

---

*Want secure automation without the complexity? Try Browser Secure—Chrome profile automation with built-in vault integration.*
