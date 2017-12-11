const path = require('path');

const createTagPages = (createPage, posts) => {
  // Load the templates
  const allTagsTemplate = path.resolve(`src/templates/all-tags.js`)
  const tagPageTemplate = path.resolve(`src/templates/tags.js`)
  //Collect posts by tags
  const postsByTag = {}
  posts.forEach(({ node: post }) => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = []
        }
        postsByTag[tag].push(post)
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

      createTagPages(createPage, posts);

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
    })
}
