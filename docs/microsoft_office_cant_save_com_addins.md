---
title: "Troubleshooting Microsoft Office Save Failures & COM Add-ins"
category: "Microsoft Issue"
tags: ["microsoft-office", "excel", "word", "save-error", "com-add-ins"]
date: 2026-11-17
---

Resolution steps for Microsoft Office applications (Word, Excel, PowerPoint) failing to save files due to interfering third-party plugins.

## Cause
When Microsoft Office apps throw save errors, freeze during saving, or refuse to save files locally or to the cloud, it is frequently caused by buggy or outdated third-party COM Add-ins locking the file save pipeline.

## Troubleshooting Steps: Check and Remove COM Add-ins

1. **Open the Application in Safe Mode (Optional diagnostic step):**
   * Press `Windows Key + R`, type `excel /safe` (or `winword /safe`), and hit Enter to test if saving works without add-ins loaded.

2. **Access COM Add-ins Settings:**
   * Open the affected Microsoft Office app (e.g., Excel or Word).
   * Go to **File > Options**.
   * In the left-hand menu, click on **Add-ins**.
   * At the bottom of the window, look for the **Manage** dropdown menu, select **COM Add-ins**, and click **Go...**

3. **Disable or Remove Interfering Add-ins:**
   * Review the list of active COM Add-ins.
   * Uncheck suspicious, outdated, or unnecessary third-party add-ins (such as old PDF converters, third-party macro tools, or enterprise extensions).
   * Click **OK** and restart the Office application.
   * Test saving your document. If successful, re-enable add-ins one by one to identify the exact culprit, then permanently **Remove** it.