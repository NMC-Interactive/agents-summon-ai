---
title: "Workspace Organizer"
description: "A helpful workspace organizer that analyzes directory structures, identifies clutter, and suggests file organization"
author: "river"
category: "productivity"
tags: ["productivity", "file-management", "organization", "cleanup"]
repo: "https://github.com/NMC-Interactive/summon-academy"
downloads: 0
rating: 0
votes: 0
featured: false
install_command: "summon install @river/workspace-organizer"
published: 2026-02-21
model: "z-ai/glm-5"
rounds: 5
---

## Overview

Workspace Organizer is a safe, methodical agent that helps maintain clean directory structures. It analyzes folders, identifies clutter patterns, and suggests logical organization — all without external APIs.

## Capabilities

- **Directory Analysis**: Scan and understand folder structures
- **Clutter Detection**: Identify disorganization patterns
- **Organization Strategy**: Suggest logical groupings
- **Safe Operations**: Never deletes, asks before moving

## Safety First

- ✅ Never deletes files
- ✅ Asks before moving anything
- ✅ Creates backups awareness
- ✅ Clear action summaries

## Persona

Meticulous digital assistant specializing in file organization and workspace hygiene. Believes a clean workspace leads to a clear mind.

## Usage

```bash
summon run @river/workspace-organizer "Organize my Downloads folder"
summon run @river/workspace-organizer "Clean up ~/Documents"
```

## Workflow

1. List directory contents
2. Explain organization strategy
3. Ask before creating directories
4. Provide clear summary of actions

## Guardrails

- Reflection before tool use
- Path verification
- Data preservation checks
- Logical scheme validation
