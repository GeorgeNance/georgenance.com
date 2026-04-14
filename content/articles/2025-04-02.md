---
title: 'New Blog!'
date: 2025-02-04
tags: ['personal','nuxt']
slug: new-blog-2025
description: New stack, who dis?
published: true
---

After not touching my blog for a couple years, I finally decided on a stack and began to rebuild it. I wanted to outline my journey and tools that got me here.


> Programmers will rewrite their entire blog 10 times before writing a single post.
> 
> <cite>Some twitter post I saw once</cite>

## Jekyll 2017 - 2020

The original version of my blog was built using Jekyll and Github pages. It was forked from another blog and I really didn't do much styling with it. To be honest, it mostly seemed like magic to me because I never learned Ruby or understood how the templating engine worked. I had no complaints though, It just worked! Jekyll was a great stack and being able to host it for free without ads was great for a blog I didn't write much on.

## Gatsby 2020 - 2024

In the summer of 2020, I taught myself React and Gatsby by building my blog. This became a great introduction to static site generators. After being a full stack PHP developer for 3 years, the Dev Experience of Gatsby was a breath of fresh air. I followed a few tutorials from [Josh Comeau][1] and I had my blog deployed by the end of the week. It was a fun time despite the world being on fire.

Unfortunately, I didn't keep up with the blog. I didn't use React professionally or in any side projects, so solving problems in Gatsby took longer than I wanted. It became harder and harder to fill my brain with programming knowledge that was only useful for one thing. Not to mention Gatsby was starting to become very slow when building my site and would randomly break because some package updated. All of that plus life changes, I didn't have the energy to keep posting or maintaining the blog.

## Eleventy 2022

After a year of not doing much with my personal site, I decided I wanted to write it in a simpler stack, something I was more familiar with. Nothing is more simple than vanilla JS.

Around this time, I kept hearing about Eleventy on podcasts. I decided to give it a look and was impressed by how simple it was. Everything is just JS, no magic. That turned out however to be a bad thing. One thing Gatsby had is a swarm of plugins for every problem you could think of. 11ty had a number of plugins too, but you would have to really dig into the config and code if you wanted to replicate a similar dev experience as Gatsby. 

I never ended up finishing the blog in 11ty. That doesn't mean there is anything wrong with 11ty, it’s a great framework for certain use cases. For me, I wanted something that is hackable but also simple when I just want to write a post. 11ty just required too much work to get it to where I wanted it to be.

## Nuxt 2024 - Current

Queue to 2024 - 2025, you are most likely reading this post on a site built with Nuxt. After doing a bit of research, I found Nuxt which is similar to NextJS but written for Vue. Nuxt is pretty cool, its got a lot of DevX features like Gatsby does but its all in Vue. In about a day and a half, I had my blog set up with all of the posts from my old site. 

Vue has been my goto framework professionally for the last 5 years. So learning Nuxt is not too difficult.

This does not mean I will stick with Nuxt forever. It has its own set of problems. It’s not without its flaws.  But being able to use Vue make its easy for me to write custom components that I can reuse in any future stack I use.  
  
Plus it supports MDX so putting components in my markdown is as easy as 

```md
::callout{title="Very Important Callout" type="warning"}

Callouts are cool

::

```

And it will render the component I made


::callout{title="Very Important Callout" type="info"}

Callouts are cool

::


Overall, I am happy with the stack I have chosen. I am excited to write more posts and share my knowledge.



**My current stack is:**
- Nuxt 3
  - Nuxt Content
  - Nuxt Image
  - Nuxt SEO
- TailwindCSS
- Coolify for hosting
- Markdown

Also, I decided to fully open source my blog. You can find the code on [Github][2]


## Conclusion

Nothing says "I want to write a blog post" like rewriting your entire blog. I am happy with the stack I have chosen. I am excited to write more posts and share my knowledge with the world. 

Expect more posts soon! :notebook: 




[1]:	https://joshwcomeau.com
[2]:	https://github.com/GeorgeNance/blog24