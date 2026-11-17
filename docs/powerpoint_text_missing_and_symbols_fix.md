---
title: "Troubleshooting PowerPoint Missing Text & Font Symbol Corruption"
category: "Microsoft Issue"
tags: ["powerpoint", "microsoft-office", "fonts", "cache", "troubleshooting"]
date: 2026-11-17
---

Resolution steps for Microsoft PowerPoint slides displaying missing text or turning text into unreadable symbols/glyphs.

## 1. PowerPoint Text Missing
If text boxes are blank or specific text is missing from slides:
* **Check File Settings / Display Options:** Go to **File > Options > Advanced**, look for the *Display* section, and toggle options related to hardware graphics acceleration or image compression that might be hiding text elements.
* **Reinstall Microsoft Office:** If core application binaries or rendering files are corrupted, run a full Online Repair or reinstall Microsoft 365 / Office via Windows settings.

## 2. PowerPoint Text Turns into Symbols
If regular text unexpectedly renders as strange symbols or Wingdings-style characters, it is usually caused by a corrupted Windows font cache:
* **Clear the Windows Font Cache:**
  1. Open **File Explorer** and navigate to the following system path:
     ```text
     C:\Windows\ServiceProfiles\LocalService\AppData\Local\FontCache
     ```
     *(Note: You may need to enable "Show hidden files, folders, and drives" in File Explorer view settings to access this directory).*
  2. Stop any running font-related services or restart your PC into **Safe Mode** if files are locked.
  3. Clear or delete the cached `.dat` font cache files to force Windows to rebuild a clean font registry upon restart.