import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

const styles = {
  fullAppBar: {
    position: 'absolute',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  divider: {
    backgroundColor: '#fff'
  },
};

const Template = ({ classes, data, location, pathContext }) => {
  const { markdownRemark: post } = data
  const { frontmatter, html } = post
  const { next, prev } = pathContext
  const { title, date } = frontmatter
  return (
    <div>
      <Helmet title={`${title} - Truthful Rants`} />
      <div>
        <Typography type='display2'>
          {title}
        </Typography>
        <Typography type='body2' gutterBottom>
          {date}
        </Typography>
        <Divider className={classes.divider} />
        <br />
        <Typography component='div' gutterBottom>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Typography>
        <Divider className={classes.divider} />
        <br />
        <Typography component='div'>
          <p>
            {
              prev 
              && 
              (
                <Link to={prev.frontmatter.path}>
                  Previous: {prev.frontmatter.title}
                </Link>
              )
            }
            &nbsp;
            {
              next 
              && 
              (
                <Link to={next.frontmatter.path}>
                  Next: {next.frontmatter.title}
                </Link>
              )
            }
          </p>
        </Typography>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html,
      frontmatter {
        title,
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
      }
    }
  }
`
export default withStyles(styles)(Template)
