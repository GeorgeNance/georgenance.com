---
title: Don’t use frontmatter to seperate your markdown files in GatsbyJS - Use the file system
date: 2020-08-27
ogImage: /articles/dont-use-frontmatter-markdown-files/cover.jpg
slug: dont-use-frontmatter-markdown-files-gatsby
tags: [gatsby, tips]
description: I am going to walk you through how to seperate your markdown files in Gatsby in a way that more sense then a frontmatter field
published: true
---



## Introduction

I have a link to the code I used for this tutorial on [github](https://github.com/GeorgeNance/seperating-markdown-by-folder-example)

I am going to walk you through how to seperate your markdown files in Gatsby in a way that makes more sense then a frontmatter field.

### How splitting up markdown is normally done

For the longest time I had to use solutions like front matter fields to specify the difference between posts and pages types

Before I learned you could tell GraphQL to know the which markdown file was a page or post. My front matter would look something like this:

```markdown
---
title: 'How to be productive as a programmer with ADHD'
date: '2020-06-19'
published: true
tags: ['adhd', 'productivity']
coverImage: cover.jpg
type: article
description: Being productive while having ADHD can sometimes feel like a colossal task.
---
```

I would use `type: article` so I could filter out only posts or articles.

### Why its bad

- Adds extra syntax to every markdown file
- It can easily become error prone
- File Systems were designed for this task.

I wanted to simplify how my blog generated articles so I could focus on creating content and not figuring out why a post was missing.

And I already had a folder structure like this:

![](/img/articles/my-folder-structure.png)

_Wouldn’t it be nice if GatsbyJS knew if a markdown file was a page or blog post based on the folder it's in?_

That makes more sense to me.

## Prerequisites

You need to have `gatsby-source-filesystem` installed.

If you are using `gatsby-transform-remark` or `gatsby-plugin-mdx` you will already have this installed. 👍

## Step 1 - Create the folder structure

Create the folder structure you want to use.

I like to separate my posts from my code so I put mine at the root level like this
`project-folder/content`

This is the folder structure I will use

```bash

📂 content
├── 📂 blog
│  ├── 📂 hello-world
│  │  ├── 📄 index.md
│  │  └── 🖼 salty_egg.jpg
│  ├── 📂 my-second-post
│  │  └── 📄 index.md
│  └── 📂 new-beginnings
│     └── 📄 index.md
└── 📂 pages
   ├── 📂 about
   │  ├── 📄 index.md
   │  └── 🖼 profile-pic.jpg
   └── 📂 now
      └── 📄 now.md

```

Each page or blog post has its own folder. This makes it easy to keep images or files it needs organized.

## Step 2 - Set up the file system in Gatsby

Install `gatsby-source-filesystem` if you don’t have it

```bash
yarn add gatsby-source-filesystem
```

We are going to be using the [Gatsby Source File System](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/) to separate our folders.

To do this, first add `gatsby-source-filesystem` as a plugin to `gatsby.config.js` . You might already have this added.

**For each type of content you want separated add a new gatsby source filesystem object** with the name and path.

In our case, we want to separate posts and pages, so we need 2 sections.

It should look something like this:

```js

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `page`,
      },
    },
	...
}
```

## Step 3 - Update Gatsby config

In `gatsby-node.js` add this code to `onCreateNode`.

```js
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent);

    let collection = parent.sourceInstanceName;

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });
  }
};
```

If you are using MDX, just swap out `MarkdownRemark` for `Mdx`

First off, we make sure that the node we are editing is a markdown file, we are grabbing the parent node so we can access some additional information.

`sourceInstanceName` is the field we set on `gatsby-source-filesystem` in the last step.

`allMarkdownRemark` alone does not have this field for us to use so we have to get it from the parent.

Then you add a `field` to the markdown node for the collection it belongs to.

## Step 4 - Let the separating begin

We can now pass a filter to gatsby to let it know what collection we want to access. Hooray! No more frontmatter types

```graphql
query {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { fields: { collection: { eq: "blog" } } }
  ) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date
          slug
          date(formatString: "MMMM DD, YYYY")
        }
        excerpt(pruneLength: 280)
      }
    }
  }
}
```



## Wrap Up

Thanks for stopping by! This was a quick tutorial I made to solve an issue I was having with GatsbyJS. This article is a part of my "write one blog post a month" challenge.

I have a link to the code I used for this tutorial on [github](https://github.com/GeorgeNance/seperating-markdown-by-folder-example)

If you would like to see more tutorials like this, let me know on [twitter](http://twitter.com/geonance) or by subscribing to my [newletter](/subscribe).

Also I recommmend checking out [Josh W Comeau](https://joshwcomeau.com/) if you want more Gatsby goodness. His tutorial on darkmode inspired me to add it to my site


