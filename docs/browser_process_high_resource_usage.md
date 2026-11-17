---
title: "Troubleshooting High Browser Process & CPU/Memory Usage"
category: "Browser Issue"
tags: ["google-chrome", "browser", "task-manager", "performance", "cache", "troubleshooting"]
date: 2026-11-17
---

Resolution steps for browsers (such as Google Chrome, Microsoft Edge) experiencing high CPU, memory spikes, or freezing processes.

## 1. Terminate Rogue Browser Processes
Instead of closing the entire browser or waiting for Windows Task Manager, use the browser's internal task manager to isolate and kill resource-heavy tabs or extensions:
* Open the browser and press `Shift + Esc` to launch the **Browser Task Manager**.
* Review processes by CPU, Memory, and Network usage.
* Select the problematic tab, extension, or background process and click **End Process**.

## 2. Clear Browser Cache & Site Data
If accumulated cache files or corrupted local site storage are driving up background CPU usage:
1. Press `Ctrl + Shift + Delete` to open the *Clear browsing data* menu.
2. Select an appropriate time range (or *All time*).
3. Check **Cached images and files** and **Cookies and other site data**.
4. Click **Clear data**, then restart the browser.