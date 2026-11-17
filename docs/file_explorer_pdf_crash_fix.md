---
title: File Explorer PDF Crash Fix
category: Windows Issue
author: Admin
date: 2026-11-17
---

# File Explorer PDF Crash Fix

Standard procedure for resolving File Explorer crashes occurring after downloading specific PDF files from Google Drive or Gmail.

## 1. Initial Assessment

* **Issue:** File Explorer keeps crashing upon accessing folders containing problematic PDFs.

* **Check:** Verify with the user if they recently downloaded any PDF files from Google Drive or Gmail.

## 2. Removing Corrupted Files via Command Prompt

* **Step 1:** Open Command Prompt (`cmd`).

* **Step 2:** Force delete the problematic file or folder using the command:
  `del /f /q /a "Path\target doc"`

## 3. Preventive Advice

* **Workaround:** Advise the user to use the **Print > Save as PDF** method to generate stable PDF files instead of direct downloads if issues persist.