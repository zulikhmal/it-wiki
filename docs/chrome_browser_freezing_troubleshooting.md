---
title: "Troubleshooting Google Chrome & File Dialog Freezing"
category: "Browser Issue"
tags: ["google-chrome", "browser", "freezing", "cache", "extensions", "troubleshooting"]
date: 2026-11-17
---

Resolution steps for Google Chrome freezing up, particularly when interacting with file dialogs, downloads, or open dialog boxes.

## Troubleshooting Steps

### 1. Clear Browser Cache
Purge accumulated cache and site data that may be causing application hangs:
* Press `Ctrl + Shift + Delete` to open the *Clear browsing data* menu.
* Select **Cached images and files** and **Cookies and other site data**, then click **Clear data**.

### 2. Isolate the Browser (Cross-Browser Test)
* Test the same action (such as opening a file download/upload dialog) in an alternative browser like **Microsoft Edge**.
* **If Edge works normally:** The issue is isolated specifically to your Google Chrome configuration or profile.

### 3. Remove Problematic Extensions
* Navigate to `chrome://extensions` in your address bar.
* Disable or remove third-party extensions (especially file handlers, download managers, or ad blockers) that might be locking system file dialogs.

### 4. Test with a New Chrome Profile
If profile data or local preferences are corrupted:
* Click your profile icon in the top right of Chrome, select **Add**, and set up a clean guest or new profile.
* Test if the freezing persists in the new profile environment.

### 5. Check for Corrupted Files in Target Folders
* **Suspect Corrupted Folder Contents:** If Chrome freezes specifically when browsing certain directories (e.g., *Downloads* or *Documents*), a corrupted media file, incomplete download, or bad thumbnail cache in that folder may be crashing the Windows shell hook. Clean out or move recent files out of that directory to test.

### 6. Reinstall Chrome (Last Resort)
* If all else fails, uninstall Google Chrome via Windows Settings, clear lingering app data directories (`C:\Users\%username%\AppData\Local\Google\Chrome`), and install a fresh copy.