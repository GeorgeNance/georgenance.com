---
title: '7 Reasons you SHOULD write CSS'
date: 2020-10-30
tags: ['css']
slug: write-more-css
ogImage: cover.png
description: SASS, LESS, and Stylus are becoming more irrelevant as CSS becomes more powerful.
published: true
---

This article is in response to this [post](https://dev.to/workflo30292556/10-reasons-why-you-should-stop-writing-css-203c) on DEV.

I believe that preprocessors like SASS, LESS, or Stylus are becoming more and more irrelevant as CSS becomes more powerful.


## 1. PostCSS

I am going to start this list with [PostCSS](https://postCSS.org). Some people will be gritting their teeth right now saying that is cheating. And they may be right in a sense. But at its core, PostCSS brings the features of future CSS to your code now. The language is still CSS. 

PostCSS bring upcoming features such as selectors, functions, and automatically adding vendor prefixes to your code.

## 2. CSS supports variables 

CSS added support for [custom variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) and every modern browser supports it. The beauty of CSS variables is that you can dynamically change the variable values without needing to recompile. My site uses CSS variables for dark mode. If you haven’t tried it, Click the moon icon in the top right. 


```css
:root {
  --color-primary: #399ee6;
  --color-text: #222;
  --b-radius: 8px;
}

button{
    background-color: var(--color-primary);
    color: var(--color-text);
    border-radius: var(--b-radius)
}

```

## 3. CSS supports imports.
For the longest time you would have one giant CSS file for everything, but modern CSS allows you to import CSS files. I have began to separate my CSS files to help keep my code more organized. 

![Screenshot of code showing CSS variables ](/img/articles/css-vars.png)

## 4. Calculations are here and they work beautifully. 

With `calc` you can do much more then you ever could before. It allows you to add, subtract, multiply, and divide in CSS. You can even do calculation using different data types such as percents and pixels.

```css
width: calc(100% - 30px);
```

## 5. Flexbox and CSS grid have changed the game

Flexbox and CSS Grid have made designing for the web an absolute treat.  A basic bootstrap grid system can be created with a few lines of code. You no longer need to use a framework to create a responsive website.



## 6. It’s the standard to style the web. 

The fundamentals of writing CSS syntax hasn’t changed much. You can rest assured that if you learn CSS, you will always know how to style the web. CSS has over 20 years of experience behind it. It won't be going away anytime soon.



## 7. Never compile 

You can edit your CSS file from anywhere and in any text editor with ever needing to compile. You don't have to worry about syntax errors preventing your code from rendering. This adds the flexibility to write CSS directly from the web console. 



## Wrap up

I highly recommend writing more vanilla CSS. Modern CSS has come a long way since the days of using tables for everything. You can create modern, efficient, and responsive websites without needing to compile any code.  