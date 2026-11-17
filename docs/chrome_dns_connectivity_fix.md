---
title: "Troubleshooting Google Chrome Network & DNS Access Issues (Gmail/Drive)"
category: "Browser Issue"
tags: ["google-chrome", "dns", "network", "cache", "gmail", "google-drive", "troubleshooting"]
date: 2026-11-17
---

Resolution steps for Google Chrome web services (such as Gmail or Google Drive) failing to load or access the internet due to DNS resolution failures.

## Troubleshooting Steps

### 1. Flush Chrome DNS Host Cache
Clearing the internal browser DNS cache forces Chrome to re-resolve domain names for Google services:
1. Open Google Chrome and type the following internal URL into the address bar, then press Enter:
   ```text
   chrome://net-internals/#dns