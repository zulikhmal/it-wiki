---
title: "Troubleshooting SAP Document Download Block Messages"
category: "Delfi Issue"
tags: ["sap", "google-chrome", "adobe", "downloads", "troubleshooting"]
date: 2026-11-17
---

Resolution steps for SAP throwing block messages or failing when downloading documents.

## Cause
SAP document download processes and PDF viewer handshakes can trigger security blocks or rendering freezes when browser-level PDF plugins attempt to intercept the file stream directly.

## Resolution Steps: Remove / Disable Adobe PDF Extension on Chrome
If Google Chrome's built-in or Adobe extension is blocking or hanging SAP file downloads:
1. Open **Google Chrome**.
2. Navigate to extensions by typing `chrome://extensions` in the address bar and hitting Enter.
3. Locate the **Adobe Acrobat** extension (or any other third-party PDF reader extension) in the list.
4. Toggle the switch to **Disable** or click **Remove** to uninstall the extension.
5. Restart Chrome and retry downloading your document from SAP.