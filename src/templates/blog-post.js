import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const Template = ({ data, location, pathContext }) => {
  const { markdownRemark: post } = data
  const { frontmatter, html } = post
  const { next, prev } = pathContext
  const { title, date } = frontmatter
  return (
    <div>
      <Helmet title={`${title} - Truthful Rants`} />
      <div>
        <h1>{title}</h1>
        <p>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
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
export default Template
