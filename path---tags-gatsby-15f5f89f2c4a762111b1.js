webpackJsonp([0x7ab76f7a7e61],{490:function(e,t){e.exports={pathContext:{tagName:"gatsby",posts:[{id:"/home/kashyap/dev/myblog/src/pages/2018-01-28-blog-with-react-gatsby/index.md absPath of file >>> MarkdownRemark",html:"<h3>React Way of Building UIs</h3>\n<p>This is my first blog post and ironically it is about how to create your own blog post site with modern Javascript using <a href=\"https://www.gatsbyjs.org/\">GatsbyJS</a> and <a href=\"https://reactjs.org/\">React</a></p>\n<p>I have created a sample blog post site and hosted it on Github Pages for this walkthrough.</p>\n<p>The source code for this project is available on <a href=\"https://github.com/khpatel4991/gatsby-react-blog-tutorial\">Github</a>. Also, working demo of this blog can be found <a href=\"https://khpatel4991.github.io/gatsby-react-blog-tutorial\">here</a>.</p>\n<h3>Setup</h3>\n<p>Install <code>gatsby-cli</code> Globally</p>\n<pre><code>yarn global add gatsby-cli\n</code></pre>\n<p>GO to your directory and create new gatsby project</p>\n<pre><code>gatsby new my-blog-tutorial\n</code></pre>\n<p>We want to have folder for each blog in the same directory as our project. The MD file for each blog will be inside the respective folder. </p>\n<p>To enable gatsby read from file-system, we need to add a plugin <code>gatsby-source-filesystem</code> which creates a <code>File</code> nodes for each folder in our file system.</p>\n<p>Then, there are several transformers which transforms this <code>File</code> nodes into different types of data.</p>\n<p>e.g</p>\n<ul>\n<li><code>gatsby-transformer-json</code> for JSON <code>File</code> Nodes to JSON Data Nodes.</li>\n<li><code>gatsby-transformer-remark</code> for Markdown <code>File</code> Nodes to Markdown Remark Nodes through which you can query HTML based on the corresponding Markdown which we ultimately want.</li>\n</ul>\n<p>Install couple of plugins to convert MD to HTML</p>\n<pre><code>yarn add gatsby-source-filesystem gatsby-transformer-remark\n</code></pre>\n<p>Add them to Gatsby Config file. Open <code>gatsby-config.js</code></p>\n<p>Add <code>gatsby-transformer-remark</code> to plugins list.</p>\n<pre><code>module.exports = {\n  siteMetadata: {\n    title: `Gatsby Default Starter`,\n  },\n  plugins: [\n    `gatsby-plugin-react-helmet`,\n    `gatsby-transformer-remark`,\n  ],\n}\n</code></pre>\n<p>To add our <code>gatsby-source-filesystem</code>, we need to add a configuration object in plugins that specified the path that it needs to resolve.</p>\n<pre><code>module.exports = {\n  siteMetadata: {\n    title: `Gatsby Default Starter`,\n  },\n  plugins: [\n    `gatsby-plugin-react-helmet`,\n    `gatsby-transformer-remark`,\n    {\n      resolve: `gastby-source-filesystem`,\n      options: {\n        name: `src`,\n        path: `${__dirname}/src`,\n      },\n    },\n  ],\n}\n</code></pre>\n<p>Hurrah! We are all set up.</p>\n<h3>First Blog using Gatsby and React</h3>\n<p>Based on our configuration, Gatsby will look for our blog folders in <code>src/pages</code> directory.</p>\n<p>So lets go that folder</p>\n<pre><code>cd src/pages\n</code></pre>\n<p>Create a new folder with the name that follows a pattern <code>yyyy-mm-dd-slug</code>. This is a wellknown pattern for maintaining multiple blogs in proper order.</p>\n<pre><code>mkdir 2017-12-10-blog-in-gatsby-react\n</code></pre>\n<p>Now lets create <code>index.md</code> in our newly created folder which will have the contents of our blog post.</p>\n<pre><code>cd 2017-12-10-blog-in-gatsby-react\ntouch index.md\n</code></pre>\n<p>Now the way that Gatsby works is, it reads the <code>front matter</code> at the top of each Markdown file and converts it to usable HTML data. So the frontmatter is the metadata for each of the blog post.</p>\n<p><code>front matter</code> will have the following information:</p>\n<ul>\n<li>path: URL where you can find this blog post</li>\n<li>date: Simple Unix Timestamp. <a href=\"https://www.unixtimestamp.com/\">Current Timestamp</a></li>\n<li>title: Title of your post</li>\n<li>tags: Array of related tags that you want to associate with this blog post</li>\n<li>excerpt: Small sneakpeak of the contents of this post that will be shown on home page.</li>\n</ul>\n<p>After the frontmatter you write the blog post in Markdown format which will become the contents of this post.</p>\n<p>Our first <code>index.md</code> will look like follows</p>\n<pre><code>---\npath: \"/blog-gatsby-react\"\ndate: \"2017-12-10T23:22:20+00:00\"\ntitle: \"Blog with Gatsby and React\"\ntags: ['blog', 'gatsby', 'react', 'markdown']\nexcerpt: \"Create and Deploy Your Blog with Gatsby and React\"\n---\n\n### Create Your Own Blog Post with Gatsby and React\n\nIn this walkthrough, I'll show you how you can create and deploy your blog using Gatsby, React and Github Pages...\n</code></pre>\n<p>For the next part, we'll have to create couple of more blog posts in the same manner as described above. Also, it'll give you some practise and familiarity with the process.</p>\n<h3>Create an Index of all your Posts with GraphQL</h3>\n<p>I have gone ahead and created a couple of other blogs(folders) in my <code>src</code> directory and it looks like follows. </p>\n<pre><code>2017-12-10-blog-in-gatsby-react  2017-12-10-react-framework  index.js\n2017-12-10-graphql-is-cool       404.js                      page-2.js\n</code></pre>\n<p>Now lets see what our projects looks like in the browser right now.\nTo start a local server run the following command from the root firectory of your project and you can see the result on your browser on <code>http://localhost:8000</code></p>\n<pre><code>gatsby develop\n</code></pre>\n<p>As you'd notice it only shows you the default page <code>index.js</code> that is already present in the <code>src/pages</code> directory.  To show the blogs that we just created, we need to add a GraphQL query in that <code>index.js</code> file.</p>\n<p>The GraphQL query is as follows, it is overwhelming at first glance, but I'll try to explain each parts of it as best as I can. Please don't copy paste the query, write it down organically based on your needs after understanding the constructs.</p>\n<p><code>IndexQuery</code> is just a name of the Query</p>\n<p><code>allMarkdownRemark</code> is what we're querying all will be provided by <code>gatsby-markdown-remark</code> plugin that we installed earlier.</p>\n<p>We want <code>totalCount</code> and <code>edges</code> from <code>allMarkdownReamark</code> where</p>\n<ul>\n<li><code>totalCount</code> is the total count of our blog posts.</li>\n<li>\n<p><code>edges</code> are the folders we created, present in our <code>src/pages</code> directory.\nNow, we want the file(<code>index.js</code>) inside the folder which we will call <code>node</code>.</p>\n<ul>\n<li><code>node</code> is the markdown file from which we can extract info about the blog.</li>\n<li><code>id</code> Unique id of the blog post</li>\n<li><code>frontmatter</code> Metadata about the post which we added while creating the <code>index.js</code> file.</li>\n</ul>\n</li>\n</ul>\n<pre><code>export const query = graphql`\n  query IndexQuery {\n    allMarkdownRemark {\n      totalCount\n      edges {\n        node {\n          id,\n          frontmatter {\n            title\n            date(formattedString: \"MMMM DD, YYYY\")\n            path\n            tags\n            excerpt\n          }\n        }\n      }\n    }\n  }\n`\n</code></pre>\n<p>Now, we can replace our <code>IndexPage</code> component to show the data which we received from this GraphQL query which it will receive as props. My <code>IndexPage</code> after necessary changes looks as follows:</p>\n<pre><code>const IndexPage = ({ data }) => {\n  const { edges: posts } = data.allMarkdownRemark\n  return (\n    &#x3C;div>\n      {posts.map(({ node: post }) => {\n        const { frontmatter } = post\n        return (\n          &#x3C;div>\n            &#x3C;h2>\n              &#x3C;Link to={frontmatter.path}>\n                {frontmatter.title}\n              &#x3C;/Link>\n            &#x3C;/h2>\n            &#x3C;p>{frontmatter.date}&#x3C;/p>\n            &#x3C;p>{frontmatter.excerpt}&#x3C;/p>\n          &#x3C;/div>\n        )\n      })}\n    &#x3C;/div>\n  )\n}\n</code></pre>\n<p>Congratulations, you have an index page that displays all your blogs at one place.</p>\n<h3>Create Blog Post Template for Gatsby</h3>\n<p>Now, its time for our blog post to show up on their own page that follows a template in React we'll provide to Gatsby.</p>\n<p>Lets create a React functional component for our template in <code>src/templates/blog-post.js</code>.</p>\n<pre><code>cd src/\nmkdir templates\ntouch blog-post.js\n</code></pre>\n<p>This is what my react component for rendering a blog post looks like.</p>\n<pre><code>const Template = ({ data, location }) => {\n  const { markdownRemark: post } = data\n  const { frontmatter, html } = post\n  const { title, date } = frontmatter\n  return (\n    &#x3C;div>\n      &#x3C;Helmet title={`${title} - Gatbsy Tutorial Blog`} />\n      &#x3C;div>\n        &#x3C;h1>{title}&#x3C;/h1>\n        &#x3C;p>{date}&#x3C;/p>\n        &#x3C;div dangerouslySetInnerHTML={{ __html: html }} />\n      &#x3C;/div>\n    &#x3C;/div>\n  )\n}\n</code></pre>\n<p>Now lets write a GraphQL query that injects blog data using the <code>location</code> prop which is provided by Gatsby based on the current location of the page.</p>\n<p>This time query <code>BlogPostByPath</code> accepts a string parameter of <code>$path</code> which should match one of the blog's path. To filter out other blogs, we query <code>frontmatter</code> of each blog post and only pick if <code>$path</code> is equal to the <code>path</code> of frontmatter.</p>\n<pre><code>export const pageQuery = grpahql`\n  query BlogPostByPath($path: String!) {\n    markdownRemark(frontmatter: { path: { eq: $path } }) {\n      html,\n      frontmatter {\n        title\n        date(formattedString: \"MMMM DD, YYYY\")\n        path,\n        tags\n        excerpt\n      }\n    }\n  }\n`\n</code></pre>\n<p>Now, if you click any one of our blogs, you'll be shown as 404 Page, as we have the template created for an individual blog post, but we haven't told Gatsby to generate this pages beforehand to serve it to users.</p>\n<h3>Dynamically generate Gatsby Blog Post by Paths</h3>\n<p>To build our pages, we'll be using Gatsby's <code>createPages</code> <a href=\"https://www.gatsbyjs.org/docs/node-apis/#createPages\">node-apis</a>.</p>\n<p>Lets modify <code>gatsby-node.js</code> from the root of our application.</p>\n<p>Include <code>path</code> as we need to access our local file system.</p>\n<p>All the exports from <code>gatsby-node.js</code> are processed by gatsby and injected with native node-apis, which we can use. Thus we'll use createPage from gatsby's <code>boundActionCreators</code>.</p>\n<p>This function should return a promise which when resolved, generates all the pages. So, we'll use GraphQL query to get all the blogposts like we did in index page and use the bounded <code>createPage</code> api to generate pages of the received data.</p>\n<p>Once you do this and restart your gatsby server by <code>gatsby develop</code>, you'll be able to open your blogs. By <code>gatsby-node.js</code> after the modification looks like as follows: </p>\n<pre><code>const path = require('path');\n\nexports.createPages = ({ graphql, boundActionCreators }) => {\n  const { createPage } = boundActionCreators\n  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)\n\n  return graphql(`{\n    allMarkdownRemark {\n      edges {\n        node {\n          id\n          html\n          frontmatter {\n            date\n            path\n            title\n            tags\n            excerpt\n          }\n        }\n      }\n    }\n  }`)\n    .then(result => {\n      // Query is resolved with al lblog post data\n      if(result.errors) {\n        return Promise.reject(result.errors)\n      }\n      const posts = result.data.allMarkdownRemark.edges\n      posts.forEach(({ node }) => {\n        createPage({\n          path: node.frontmatter.path,\n          component: blogPostTemplate,\n        })\n      })\n    })\n}\n</code></pre>\n<p>COngratulation, you have a functioning blog where users can go to each blog post individually.</p>\n<h3>Include Links to Next and Prev Blogs</h3>\n<p>To navigate between your blog posts, right now you have to go to home page and choose another blog, instead we'll be adding active next and prev links on each blog page for navigation.</p>\n<p>To pass previous and next blog, we can pass another parameter to gatsby's <code>createPage</code> called <code>context</code> which will be a plain object where in we'll pass the next and previous blogs. Note for the first blog, there will be no previous blog and for the last, ther won't be a next blog. My updated <code>forEach</code> for creating pages is as follows.</p>\n<pre><code>posts.forEach(({ node }, index) => {\n  createPage({\n    path: node.frontmatter.path,\n    component: blogPostTemplate,\n    context: {\n      prev: index === 0 ? null : posts[index - 1].node,\n      next: index === posts.length -1 ? null : posts[index + 1].node,\n    }\n  })\n})\n</code></pre>\n<p>Now, lets modify our <code>blog-post.js</code> which is our template for each blog to include links for next and prev. That can easily be done by modifying the react component which will receive the <code>context</code> we passed as <code>pathContext</code> prop. We can use <code>&#x3C;Link></code> component provided by Gatsby and pass the path of the next or prev blog.</p>\n<h3>Let's add a Tags Page and Display all Tags in a Blog</h3>\n<p>Here I want to achieve 3 things: </p>\n<ol>\n<li>We don't have our tags showing on index page with each blog. Fix that</li>\n<li>I want to have a page that shows all blogs for a selected tag called <code>/tags/${tag}</code>.</li>\n<li>A page that lists all the tags <code>/tags</code> and when any tag is clicked, they will see the page that shows all blogs with the selected tags.</li>\n</ol>\n<p>Lets start by making a template for <code>/tags/${tag}</code> page that shows all blogs for a selected tag called <code>tags.js</code> in <code>src/templates</code>. It will contain just a react component. It will receive filtered posts and selected tag from <code>pathContext</code> props which means we need to modify our <code>createPages</code> function in <code>gatsby-node.js</code> to inject all tags as context when we create the page.</p>\n<p>Similarly we can create a template for <code>/tags</code> page called <code>all-tags.js</code> in <code>src/templates</code> which will received all the tags as <code>pathContext</code> prop.</p>\n<p>Now lets create a function in <code>gatsby-node.js</code> that generates all Tag pages and call it in the promise resolve function. It shall go as follows</p>\n<pre><code>const createTagPages = (createPage, posts) => {\n  // Load the templates\n  const allTagsTemplate = path.resolve(`src/templates/all-tags.js`)\n  const tagPageTemplate = path.resolve(`src/templates/tags.js`)\n  //Collect posts by tags\n  const postsByTag = {}\n  posts.forEach(({ node: post }) => {\n    if (post.formatter.tags) {\n      post.formatter.tags.forEach(tag => {\n        if (!postsByTag[tag]) {\n          postsByTag[tag] = []\n        }\n        postsByTags[tag].push(post)\n      })\n    }\n  })\n  const tags = Object.keys(postsByTag)\n\n  // Create `/tags` page\n  createPage({\n    path: '/tags',\n    component: allTagsTemplate,\n    context: {\n      tags: tags.sort(),\n    },\n  })\n\n  // Create `/tags/${tag}` page\n  tags.forEach(tag => {\n    const posts = postsByTag[tag]\n    createPage({\n      path: `/tags/${tag}`,\n      component: tagPageTemplate,\n      context: {\n        tagName: tag,\n        posts,\n      },\n    })\n  })\n}\n</code></pre>\n<p>Finally update the <code>src/pages/index.js</code> to show the tags on the home page.</p>\n<p>Finally, restart gatsby server with <code>gatsby develop</code> and try out the new pages.</p>\n<h3>Let's Deploy to Github Pages</h3>\n<p>To deploy your blog, you need to have a valid Github account. Also, create an empty github repository with same name you would like to have your URL to be like. </p>\n<p>e.g.</p>\n<p>I want my blog at <code>https://khpatel4991.github.io/gatsby-react-blog-tutorial</code>. So I created an empty Git repository called <code>gatsby-react-blog-tutorial</code>. Once you have created the repo, Initialize Git on your root directory and set remote origin to your repository URL.</p>\n<pre><code>git init\ngit remote add origin git@github.com:khpatel4991/gatsby-react-blog-tutorial.git\n</code></pre>\n<p>Lets install <code>gh-pages</code> which will help us deploy.</p>\n<pre><code>yarn add --dev gh-pages\n</code></pre>\n<p>Now, add <code>deploy</code> script in <code>package.json</code> as follows: </p>\n<pre><code>\"deploy\": \"gatsby build --prefix-paths &#x26;&#x26; gh-pages -d public\",\n</code></pre>\n<p>Lets set the <code>pathPrefix</code> in <code>gatsby-config.js</code> which sets the path after your Github url. It's <strong>extremely important</strong> that you set this to your repository name same as <code>pathPrefix</code>.</p>\n<pre><code>module.exports = {\n  pathPrefix: `/gatsby-react-blog-tutorial`,\n  siteMetadata: {\n    title: `Gatsby Default Starter`,\n  },\n  plugins: [\n    `gatsby-plugin-react-helmet`,\n    `gatsby-transformer-remark`,\n    {\n      resolve: `gatsby-source-filesystem`,\n      options: {\n        name: `src`,\n        path: `${__dirname}/src`,\n      },\n    },\n  ],\n}\n</code></pre>\n<p>Finally to deploy,</p>\n<pre><code>yarn run deploy\n</code></pre>\n<p>This tutorial is made possible by this extremely helpful <a href=\"https://egghead.io/courses/build-a-blog-with-react-and-markdown-using-gatsby\">Egghead course on Gatsby</a> by <a href=\"https://twitter.com/taylorbell\">Taylor Bell</a> from where I learned and created my first blog.</p>",frontmatter:{date:"2018-01-28T07:00:07+00:00",path:"/blog-with-react-gatsby",title:"Blog with React Gatbsy",tags:["javascript","react","functional","gatsby","static-site-generator"],excerpt:"Simple setup for creating personal blog with Gatsby and React."}}]}}}});
//# sourceMappingURL=path---tags-gatsby-15f5f89f2c4a762111b1.js.map