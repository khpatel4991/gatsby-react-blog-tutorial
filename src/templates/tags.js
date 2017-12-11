import React from 'react'
import Link from 'gatsby-link'

const Tags = ({ pathContext }) => {
  const { posts, tagName } = pathContext
  if (posts) {
    return (
      <div>
        <p>Posts about <code>{tagName}</code></p>
        <ul>
          {posts.map(post => (
            <li>
              <Link to={post.frontmatter.path}>
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Tags
