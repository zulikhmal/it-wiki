---
title: "Troubleshooting Google Workspace Sync Issues in Outlook (Email & Calendar)"
category: "GWS Issue"
tags: ["google-workspace", "outlook", "email", "calendar", "sync", "troubleshooting"]
date: 2026-11-17
---

Resolution steps for Google Workspace emails and calendar entries failing to synchronize properly within Microsoft Outlook.

## 1. Email Not Synced to Outlook
If incoming or outgoing emails are stuck or failing to sync:
* **Restart Outlook:** Close Microsoft Outlook completely and relaunch it.
* **Run GWSMO Sync Tool:** If restarting Outlook does not resolve the sync hang, close Outlook entirely and run the **Google Workspace Sync for Microsoft Outlook (GWSMO)** user utility tool to force-reestablish the mailbox sync profile.

## 2. Calendar Not Synced
If calendar events are missing, outdated, or failing to update:
* **Delete and Overwrite:** Remove the desynced calendar cache or local sync entries, then trigger a fresh synchronization to download and overwrite the calendar with the latest server data from Google Workspace.