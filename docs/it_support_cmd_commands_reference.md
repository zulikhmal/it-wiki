---
title: IT Support CMD Commands Reference
category: CMD Reference
author: Admin
date: 2026-11-20
---

# IT Support CMD Commands Reference

Standard reference guide for essential Windows Command Prompt (`cmd`) commands used in daily IT troubleshooting and system maintenance.

## 1. Network Troubleshooting
- **Check IP Configuration:** `ipconfig /all`
- **Release & Renew IP:** `ipconfig /release` followed by `ipconfig /renew`
- **Flush DNS Cache:** `ipconfig /flushdns`
- **Test Connectivity:** `ping <IP_or_Domain>` (use `-t` for continuous ping)
- **Trace Network Path:** `tracert <IP_or_Domain>`
- **DNS Lookup:** `nslookup <Domain>`
- **View Active Connections:** `netstat -ano`

## 2. System & Disk Repair
- **System File Checker:** `sfc /scannow` (Scans and repairs corrupted Windows system files)
- **DISM Health Restore:** `DISM /Online /Cleanup-Image /RestoreHealth` (Repairs Windows image)
- **Check Disk:** `chkdsk C: /f /r` (Checks for disk errors and bad sectors; requires reboot)

## 3. Group Policy & User Management
- **Force Group Policy Update:** `gpupdate /force`
- **View Applied Policies:** `gpresult /r`
- **Check Current User & Domain:** `whoami`
- **View User Account Details:** `net user <Username> /domain`

## 4. File & Process Management
- **Force Delete File:** `del /f /q /a "Path\target_file"`
- **Force Delete Folder:** `rmdir /s /q "Path\target_folder"`
- **List Running Processes:** `tasklist`
- **Force Kill Process:** `taskkill /F /IM <process_name.exe>` (or `/PID <Process_ID>`)

## 5. System Information & Power
- **Detailed System Specs:** `systeminfo`
- **Generate Battery Report:** `powercfg /batteryreport`
- **Immediate Restart:** `shutdown /r /t 0`
- **Immediate Shutdown:** `shutdown /s /t 0`