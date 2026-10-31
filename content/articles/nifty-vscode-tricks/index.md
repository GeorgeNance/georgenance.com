---
title: 'Nifty VScode Tricks'
date: 2020-05-21
tags: ['vscode']
slug: nifty-vscode-tricks
description: Some vscode tricks I have learned that have helped me a ton
published: true
---

## Change Color Picker mode

I have begun to move most of my colors on my website to using HSL and needed an easy way to select colors. I discovered that by clicking on the status bar in the color picker, you can change the color format. At the moment it supports RGB, Hex, and HSL.

![Color Picker](vscode-color-picker.gif)

<Callout title="Side note about alpha">

_You won't be able to use this method with colors that have an alpha value. See this [issue](https://github.com/Microsoft/vscode/issues/31644)_

</Callout>

## Auto format the document on save

I hate unformatted code. It's hard to read, takes long to debug, and as someone who is a bit of a perfectionist, it irks my soul. But alas, VSCode to the rescue again. Deep in the settings, you can your code formatted _automagically✨_.

This setting is in:

`Settings > Text Editor > Formatting`

![Picture of Auto-Format setting in VsCode](autoformat.png)

There's also a setting to format on paste! Great for keeping those Stack Overflow snippets formatted the same as the rest of your code.

## Linting your grammer

Okay, this one isn't built into vscode, but it's an amazing plugin I discovered. As a developer _trying_ to get better at writing, this one has been useful. I'm using it right now to write this blog post.

![Picture of Write Good Linter in VsCode](lint-grammar.png)

Its called [Write Good Linter](https://marketplace.visualstudio.com/items?itemName=travisthetechie.write-good-linter) and you can think of it as the Hemingway editor built into vscode. After installing it, the plugin will detect any unnecessary grammar and put a little <u>squiggle</u> under words that need adjusted.
