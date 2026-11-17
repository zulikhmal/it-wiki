---
title: "Troubleshooting CCTV Recording & Folder Synchronization (Reolink)"
category: "Delfi Issue"
tags: ["cctv", "reolink", "recording", "sync", "batch-script", "sop"]
date: 2026-11-17
---

Standard operating procedure for resolving CCTV camera recording failures and synchronization issues with local storage folders.

## Resolution Steps: Run Reolink Desktop Batch Script
If CCTV feeds fail to record locally or stop synchronizing recorded video files to their designated shared folders:
1. Access the workstation desktop.
2. Locate and execute the automated batch sync utility shortcut:
   * **Batch Script Name:** `batchrun Reolink` (located on the Desktop).
3. Double-click the batch file to run it with elevated permissions. This script will restart background camera polling services, clear temporary IPC cache, and re-establish write permissions to the destination sync folder.
4. Verify that new video files begin populating in the target directory after execution.