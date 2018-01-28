import React from 'react'
import Link from 'gatsby-link'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip'

const styles = theme => ({
  root: {
    background: 'black',
    color: 'white',
  },
  item: {
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
})

const IndexPage = ({ classes, theme, data }) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div className={classes.root}>
      {posts.map(({ node: post }) => {
        const { frontmatter } = post
        return (
          <div className={classes.item} key={post.id}>
            <Typography type="headline">
              <Link to={frontmatter.path}>
                {frontmatter.title}
              </Link>
            </Typography>
            <Typography gutterBottom>
              {frontmatter.date}
            </Typography>
            <Typography>
              {frontmatter.excerpt}
            </Typography>
            <div className={classes.row}>
              {frontmatter.tags.map((tag, i) => (
                <Typography type="caption" key={`${post.id}-${tag}`}>
                  <Link to={`/tags/${tag}`}>
                    {tag}
                  </Link>
                  &nbsp;
                </Typography>
              ))}
            </div>
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
