---
title: File Explorer Endless Loading & Freezing
category: Windows Operating System
author: Admin
date: 2026-11-05
---

# File Explorer Endless Loading & Freezing

Troubleshooting steps to resolve a hanging or permanently loading Windows File Explorer without needing to perform a full system reboot.

## Symptoms
* The File Explorer window opens, but the address bar keeps loading infinitely (green loading bar across the top).
* Desktop icons or the taskbar become unresponsive.

---

## Resolution Steps

### Method 1: Restart Windows Explorer via Task Manager (Quickest Fix)
1. Press **Ctrl + Shift + Esc** on your keyboard to open **Task Manager**.
2. If Task Manager opens in compact view, click **More details** at the bottom.
3. Under the **Processes** tab, scroll down to find **Windows Explorer** (or press the `W` key to jump down).
4. Right-click on **Windows Explorer** and select **Restart**.
   * *Note: Your taskbar, desktop background, and open file windows will disappear for 2 to 3 seconds while it reboots.*

### Method 2: Clear File Explorer History
If the issue persists after restarting the process:
1. Open the Start menu, type **File Explorer Options**, and hit Enter.
2. Under the **General** tab, look at the **Privacy** section at the bottom.
3. Click the **Clear** button next to *Clear File Explorer history*.
4. Click **Apply** and **OK**, then restart Windows Explorer again using Method 1.

### Method 3: Check for Corrupt System Files
If File Explorer keeps freezing regularly:
1. Open the Start menu, type `cmd`, right-click **Command Prompt**, and select **Run as administrator**.
2. Type the following command and press Enter:
   ```cmd
   sfc /scannow