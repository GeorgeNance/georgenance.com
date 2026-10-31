---
title: 'A useful shell command for killing processes by port'
date: 2024-02-01
tags: ['productivity']
slug: useful-function-killing-process-port
description: Heres a cool command
published: true
---

Hey everyone, I want to share with you a commandline function that helps quickly kill processes by their port. Some of the servers I start up love to stay running in the background after I closed them. So I often get errors that say something like:

```bash
error: [Errno 48] Address already in use
```

or 

```
Failed to listen on localhost:8000 (reason: Address already in use)
```


Here is a function to quickly kill any rogue processes on a certain port


To use this, just add it to `~/.bashrc` or `~/.zshrc` file:

```bash
# Kills a process running on a specified tcp port
killport() {
  echo "Killing process on port: $1";
  kill -9 $(lsof -t -i:$1 -sTCP:LISTEN)
}
```
Reload your terminal and now you call kill any port you need access to

```bash
> killport 9000
Killing process on port: 8000
```
