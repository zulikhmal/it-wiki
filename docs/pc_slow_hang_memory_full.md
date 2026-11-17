---
title: "Troubleshooting Slow Performance, Freezes & High Memory Usage"
category: "Windows Issue"
tags: ["performance", "troubleshooting", "maintenance", "cmd"]
date: 2026-11-17
---

If a Windows PC is running slow, hanging, or reporting full memory, follow this systematic troubleshooting SOP to resolve performance bottlenecks.

## 1. Clear Temporary Files
Remove accumulated cache and temporary junk files that clutter storage and RAM:
* Press `Windows Key + R`, type `temp`, and delete all files inside the folder (skip any currently in use).
* Press `Windows Key + R`, type `%temp%`, and clear out all temporary application files.
* Press `Windows Key + R`, type `prefetch`, and clear the folder contents.
* Run **Disk Cleanup** (`cleanmgr`) on your main drive (`C:`) to purge system cache, Windows update leftovers, and temporary installation files.

## 2. System File & Image Repair (Command Prompt)
Run system integrity checks via elevated Command Prompt (Run as Administrator):
* Run SFC scan first to check and repair corrupted system files:
  ```cmd
  sfc /scannow