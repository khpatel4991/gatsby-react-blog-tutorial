---
path: "/blog-with-react-gatsby"
date: "2018-01-28T07:00:07+00:00"
title: "Blog with React Gatbsy"
tags: ["javascript", "react", "functional", "gatsby", "static-site-generator"]
excerpt: "Simple setup for creating personal blog with Gatsby and React."
---

### React Way of Building UIs

This is my first blog post and ironically it is about how to create your own blog post site with modern Javascript using [GatsbyJS](https://www.gatsbyjs.org/) and [React](https://reactjs.org/)

I have created a sample blog post site and hosted it on Github Pages for this walkthrough.

The source code for this project is available on [Github](https://github.com/khpatel4991/gatsby-react-blog-tutorial). Also, working demo of this blog can be found [here](https://khpatel4991.github.io/gatsby-react-blog-tutorial).

### Setup

Install `gatsby-cli` Globally

```
yarn global add gatsby-cli
```

GO to your directory and create new gatsby project

```
gatsby new my-blog-tutorial
```

We want to have folder for each blog in the same directory as our project. The MD file for each blog will be inside the respective folder. 

To enable gatsby read from file-system, we need to add a plugin `gatsby-source-filesystem` which creates a `File` nodes for each folder in our file system.

Then, there are several transformers which transforms this `File` nodes into different types of data.

e.g

* `gatsby-transformer-json` for JSON `File` Nodes to JSON Data Nodes.
* `gatsby-transformer-remark` for Markdown `File` Nodes to Markdown Remark Nodes through which you can query HTML based on the corresponding Markdown which we ultimately want.

Install couple of plugins to convert MD to HTML

```
yarn add gatsby-source-filesystem gatsby-transformer-remark
```

Add them to Gatsby Config file. Open `gatsby-config.js`

Add `gatsby-transformer-remark` to plugins list.

```
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
  ],
}
```

To add our `gatsby-source-filesystem`, we need to add a configuration object in plugins that specified the path that it needs to resolve.

```
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: `gastby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
  ],
}
```

Hurrah! We are all set up.

### First Blog using Gatsby and React

Based on our configuration, Gatsby will look for our blog folders in `src/pages` directory.

So lets go that folder

```
cd src/pages
```

Create a new folder with the name that follows a pattern `yyyy-mm-dd-slug`. This is a wellknown pattern for maintaining multiple blogs in proper order.

```
mkdir 2017-12-10-blog-in-gatsby-react
```

Now lets create `index.md` in our newly created folder which will have the contents of our blog post.

```
cd 2017-12-10-blog-in-gatsby-react
touch index.md
```

Now the way that Gatsby works is, it reads the `front matter` at the top of each Markdown file and converts it to usable HTML data. So the frontmatter is the metadata for each of the blog post.

`front matter` will have the following information:

* path: URL where you can find this blog post
* date: Simple Unix Timestamp. [Current Timestamp](https://www.unixtimestamp.com/)
* title: Title of your post
* tags: Array of related tags that you want to associate with this blog post
* excerpt: Small sneakpeak of the contents of this post that will be shown on home page.

After the frontmatter you write the blog post in Markdown format which will become the contents of this post.

Our first `index.md` will look like follows

```
---
path: "/blog-gatsby-react"
date: "2017-12-10T23:22:20+00:00"
title: "Blog with Gatsby and React"
tags: ['blog', 'gatsby', 'react', 'markdown']
excerpt: "Create and Deploy Your Blog with Gatsby and React"
---

### Create Your Own Blog Post with Gatsby and React

In this walkthrough, I'll show you how you can create and deploy your blog using Gatsby, React and Github Pages...
```

For the next part, we'll have to create couple of more blog posts in the same manner as described above. Also, it'll give you some practise and familiarity with the process.

### Create an Index of all your Posts with GraphQL

I have gone ahead and created a couple of other blogs(folders) in my `src` directory and it looks like follows. 

```
2017-12-10-blog-in-gatsby-react  2017-12-10-react-framework  index.js
2017-12-10-graphql-is-cool       404.js                      page-2.js
```

Now lets see what our projects looks like in the browser right now.
To start a local server run the following command from the root firectory of your project and you can see the result on your browser on `http://localhost:8000`

```
gatsby develop
```

As you'd notice it only shows you the default page `index.js` that is already present in the `src/pages` directory.  To show the blogs that we just created, we need to add a GraphQL query in that `index.js` file.

The GraphQL query is as follows, it is overwhelming at first glance, but I'll try to explain each parts of it as best as I can. Please don't copy paste the query, write it down organically based on your needs after understanding the constructs.

`IndexQuery` is just a name of the Query

`allMarkdownRemark` is what we're querying all will be provided by `gatsby-markdown-remark` plugin that we installed earlier.

We want `totalCount` and `edges` from `allMarkdownReamark` where
* `totalCount` is the total count of our blog posts.
* `edges` are the folders we created, present in our `src/pages` directory.
Now, we want the file(`index.js`) inside the folder which we will call `node`.
  * `node` is the markdown file from which we can extract info about the blog.
    * `id` Unique id of the blog post
    * `frontmatter` Metadata about the post which we added while creating the `index.js` file.

```
export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id,
          frontmatter {
            title
            date(formattedString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`
```

Now, we can replace our `IndexPage` component to show the data which we received from this GraphQL query which it will receive as props. My `IndexPage` after necessary changes looks as follows:

```
const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div>
      {posts.map(({ node: post }) => {
        const { frontmatter } = post
        return (
          <div>
            <h2>
              <Link to={frontmatter.path}>
                {frontmatter.title}
              </Link>
            </h2>
            <p>{frontmatter.date}</p>
            <p>{frontmatter.excerpt}</p>
          </div>
        )
      })}
    </div>
  )
}
```

Congratulations, you have an index page that displays all your blogs at one place.

### Create Blog Post Template for Gatsby

Now, its time for our blog post to show up on their own page that follows a template in React we'll provide to Gatsby.

Lets create a React functional component for our template in `src/templates/blog-post.js`.

```
cd src/
mkdir templates
touch blog-post.js
```

This is what my react component for rendering a blog post looks like.

```
const Template = ({ data, location }) => {
  const { markdownRemark: post } = data
  const { frontmatter, html } = post
  const { title, date } = frontmatter
  return (
    <div>
      <Helmet title={`${title} - Gatbsy Tutorial Blog`} />
      <div>
        <h1>{title}</h1>
        <p>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
```
Now lets write a GraphQL query that injects blog data using the `location` prop which is provided by Gatsby based on the current location of the page.

This time query `BlogPostByPath` accepts a string parameter of `$path` which should match one of the blog's path. To filter out other blogs, we query `frontmatter` of each blog post and only pick if `$path` is equal to the `path` of frontmatter.

```
export const pageQuery = grpahql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html,
      frontmatter {
        title
        date(formattedString: "MMMM DD, YYYY")
        path,
        tags
        excerpt
      }
    }
  }
`
```

Now, if you click any one of our blogs, you'll be shown as 404 Page, as we have the template created for an individual blog post, but we haven't told Gatsby to generate this pages beforehand to serve it to users.

### Dynamically generate Gatsby Blog Post by Paths

To build our pages, we'll be using Gatsby's `createPages` [node-apis](https://www.gatsbyjs.org/docs/node-apis/#createPages).

Lets modify `gatsby-node.js` from the root of our application.

Include `path` as we need to access our local file system.

All the exports from `gatsby-node.js` are processed by gatsby and injected with native node-apis, which we can use. Thus we'll use createPage from gatsby's `boundActionCreators`.

This function should return a promise which when resolved, generates all the pages. So, we'll use GraphQL query to get all the blogposts like we did in index page and use the bounded `createPage` api to generate pages of the received data.

Once you do this and restart your gatsby server by `gatsby develop`, you'll be able to open your blogs. By `gatsby-node.js` after the modification looks like as follows: 

```
const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          id
          html
          frontmatter {
            date
            path
            title
            tags
            excerpt
          }
        }
      }
    }
  }`)
    .then(result => {
      // Query is resolved with al lblog post data
      if(result.errors) {
        return Promise.reject(result.errors)
      }
      const posts = result.data.allMarkdownRemark.edges
      posts.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
        })
      })
    })
}
```
COngratulation, you have a functioning blog where users can go to each blog post individually.

### Include Links to Next and Prev Blogs

To navigate between your blog posts, right now you have to go to home page and choose another blog, instead we'll be adding active next and prev links on each blog page for navigation.

To pass previous and next blog, we can pass another parameter to gatsby's `createPage` called `context` which will be a plain object where in we'll pass the next and previous blogs. Note for the first blog, there will be no previous blog and for the last, ther won't be a next blog. My updated `forEach` for creating pages is as follows.

```
posts.forEach(({ node }, index) => {
  createPage({
    path: node.frontmatter.path,
    component: blogPostTemplate,
    context: {
      prev: index === 0 ? null : posts[index - 1].node,
      next: index === posts.length -1 ? null : posts[index + 1].node,
    }
  })
})
```

Now, lets modify our `blog-post.js` which is our template for each blog to include links for next and prev. That can easily be done by modifying the react component which will receive the `context` we passed as `pathContext` prop. We can use `<Link>` component provided by Gatsby and pass the path of the next or prev blog.

### Let's add a Tags Page and Display all Tags in a Blog

Here I want to achieve 3 things: 

1. We don't have our tags showing on index page with each blog. Fix that
2. I want to have a page that shows all blogs for a selected tag called `/tags/${tag}`.
3. A page that lists all the tags `/tags` and when any tag is clicked, they will see the page that shows all blogs with the selected tags.

Lets start by making a template for `/tags/${tag}` page that shows all blogs for a selected tag called `tags.js` in `src/templates`. It will contain just a react component. It will receive filtered posts and selected tag from `pathContext` props which means we need to modify our `createPages` function in `gatsby-node.js` to inject all tags as context when we create the page.

Similarly we can create a template for `/tags` page called `all-tags.js` in `src/templates` which will received all the tags as `pathContext` prop.

Now lets create a function in `gatsby-node.js` that generates all Tag pages and call it in the promise resolve function. It shall go as follows

```
const createTagPages = (createPage, posts) => {
  // Load the templates
  const allTagsTemplate = path.resolve(`src/templates/all-tags.js`)
  const tagPageTemplate = path.resolve(`src/templates/tags.js`)
  //Collect posts by tags
  const postsByTag = {}
  posts.forEach(({ node: post }) => {
    if (post.formatter.tags) {
      post.formatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = []
        }
        postsByTags[tag].push(post)
      })
    }
  })
  const tags = Object.keys(postsByTag)

  // Create `/tags` page
  createPage({
    path: '/tags',
    component: allTagsTemplate,
    context: {
      tags: tags.sort(),
    },
  })

  // Create `/tags/${tag}` page
  tags.forEach(tag => {
    const posts = postsByTag[tag]
    createPage({
      path: `/tags/${tag}`,
      component: tagPageTemplate,
      context: {
        tagName: tag,
        posts,
      },
    })
  })
}
```

Finally update the `src/pages/index.js` to show the tags on the home page.

Finally, restart gatsby server with `gatsby develop` and try out the new pages.

### Let's Deploy to Github Pages

To deploy your blog, you need to have a valid Github account. Also, create an empty github repository with same name you would like to have your URL to be like. 

e.g.

I want my blog at `https://khpatel4991.github.io/gatsby-react-blog-tutorial`. So I created an empty Git repository called `gatsby-react-blog-tutorial`. Once you have created the repo, Initialize Git on your root directory and set remote origin to your repository URL.

```
git init
git remote add origin git@github.com:khpatel4991/gatsby-react-blog-tutorial.git
```

Lets install `gh-pages` which will help us deploy.

```
yarn add --dev gh-pages
```

Now, add `deploy` script in `package.json` as follows: 

```
"deploy": "gatsby build --prefix-paths && gh-pages -d public",
```

Lets set the `pathPrefix` in `gatsby-config.js` which sets the path after your Github url. It's **extremely important** that you set this to your repository name same as `pathPrefix`.
```
module.exports = {
  pathPrefix: `/gatsby-react-blog-tutorial`,
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
  ],
}

```
Finally to deploy,
```
yarn run deploy
```

This tutorial is made possible by this extremely helpful [Egghead course on Gatsby](https://egghead.io/courses/build-a-blog-with-react-and-markdown-using-gatsby) by [Taylor Bell](https://twitter.com/taylorbell) from where I learned and created my first blog.