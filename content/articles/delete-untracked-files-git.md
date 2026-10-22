---
title: 'Deleting untracked files from git'
date: 2019-09-05
tags: ['git']
slug: delete-untracked-files-git
description: If you want to remove untracked files from your repo, git reset wont work
ogImage: /articles/delete-untracked-files-git/cover.png
published: true
---

## The problem:

Have you ever tried to pull down some new changes and come across this error?

```bash
error: The following untracked working tree files would be overwritten by merge:
	resources/views/untrackedFolder/untrackedFile.blade.php
    resources/views/untrackedFolder/anotherUntrackedFile.blade.php
Please move or remove them before you can merge.
Aborting
```

Untracked files huh? Okay, that doesn't sound too difficult. You should be able to run

`git reset --hard`

#### But wait

They are still there! _What gives !?_

![wait what](https://media.giphy.com/media/IMuqnp96sdhyE/giphy.gif)

The reason is because `git reset --hard` **only removes files that are already a part of the repo**

## Solution

From the [git docs](https://git-scm.com/docs/git-clean), we will find this command:

```bash
git clean -n
```

`-n` this flag will show you what files will be removed.

You should use this flag first to determine what is going to be removed.

```bash
git clean -f
```

`-f` this flag means it will delete the files **permanently**.

## Other useful commands

`git clean -fd` will also delete folders

`git clean -fX` removes ignored files

`git clean -fx` removes both ignored and non-ignored files

There you go, you should have a clean repository that has the changes committed before.
