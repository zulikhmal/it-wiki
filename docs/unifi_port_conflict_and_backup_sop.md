---
title: "UniFi Ubiquiti Controller: Port Conflict Troubleshooting & Backup SOP"
category: "Delfi Issue"
tags: ["unifi", "ubiquiti", "network", "port-conflict", "backup", "sop"]
date: 2026-11-17
---

Standard operating procedure for resolving UniFi Controller startup port conflicts (specifically port 8880) and managing configuration backups.

## 1. Resolving Port Conflicts on Startup (Port 8880)
If the UniFi Controller shows a port error or fails to start up properly during launch:

1. **Find the Process Using the Port via Command Prompt:**
   * Open Command Prompt as Administrator (`Win + X` > *Command Prompt (Admin)*).
   * Run the following command to check what application is occupying port 8880:
     ```cmd
     netstat -ano | findstr :8880
     ```
   * Note the PID (Process ID) number shown at the far right of the conflicting line.

2. **Terminate the Conflicting Task:**
   * Open **Task Manager** (`Ctrl + Shift + Esc`) or check Windows **Services** (`services.msc`).
   * Locate the process or service matching that PID, right-click, and select **End Task** (or stop the service).
   * Relaunch the UniFi Controller application.

## 2. Controller Configuration Backups & Restoration
To backup or migrate your UniFi network configuration:

* **Export Settings Only:**
  1. Open the UniFi Controller dashboard.
  2. Navigate to **Settings > System > Backups**.
  3. Click **Download** and select **Settings Only** to export a lightweight configuration backup file.
* **Import / Restore Settings:**
  * On a fresh or reset UniFi Controller instance, navigate to the same backup section and click **Restore**, then upload your saved configuration file.