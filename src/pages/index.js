import React from 'react'
import Link from 'gatsby-link'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    background: 'black',
    color: 'white',
  }
})

const IndexPage = ({ classes, theme, data }) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div className={classes.root}>
      {posts.map(({ node: post }) => {
        const { frontmatter } = post
        return (
          <div key={post.id}>
            <h2>
              <Link to={frontmatter.path}>
                {frontmatter.title}
              </Link>
            </h2>
            <p>{frontmatter.date}</p>
            <p>{frontmatter.excerpt}</p>
            <p>{frontmatter.tags.map(tag => (
              <span>
                <Link to={`/tags/${tag}`}>
                  <code>{tag}</code>
                </Link>
                &nbsp;
              </span>
            ))}</p>
          </div>
        )
      })}
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`

export default withStyles(styles, { withTheme: true })(IndexPage);
