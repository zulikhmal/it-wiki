---
title: "Asset Management Server PC: Maintenance & Quick Reference SOP"
category: "Delfi Issue"
tags: ["asset-management", "server", "autocount", "network", "wamp", "teamviewer", "sop"]
date: 2026-11-17
---

Standard operating procedures and quick reference configuration details for the Asset Management Server PC.

## 1. Remote Support Access (AutoCount Subang TeamViewer)
* **TeamViewer ID / Connection:** Used by the **AutoCount Subang Team** for remote maintenance, inventory system syncing, and accounting software troubleshooting. Ensure TeamViewer is set to start automatically with Windows.

## 2. Network Configuration & Static IP
If the LAN adapter is reset, unplugged, or replaced, the server's static IP address must be re-applied to maintain database connectivity across clients.

* **Assigned Static IP Address:** `10.11.12.13`
* **Steps to reconfigure after LAN reset:**
  1. Press `Windows Key + R`, type `ncpa.cpl`, and hit Enter to open **Network Connections**.
  2. Right-click your active Ethernet adapter and select **Properties**.
  3. Double-click **Internet Protocol Version 4 (TCP/IPv4)**.
  4. Select **Use the following IP address** and enter:
     * **IP address:** `10.11.12.13`
     * **Subnet mask:** *(Set according to your local subnet, e.g., `255.255.255.0`)*
     * **Default gateway:** *(Enter your local network gateway)*
  5. Click **OK** to save changes.

## 3. WAMP Server Service Management
If local web applications, database tools, or PHP services hosted on the server fail to load:
* **Restart WAMP Services:**
  1. Open the WAMP tray icon (or open **Services** via `services.msc`).
  2. Restart the core services to clear cache and restore server connections:
     * `wampapache64` (Apache Web Server)
     * `wampmysqld64` (MySQL Database)
  3. Verify that the WAMP icon turns green, indicating all services are running normally.