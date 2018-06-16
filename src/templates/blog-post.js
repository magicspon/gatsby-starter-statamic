import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Bio from '../components/Bio'

class BlogPostTemplate extends React.Component {
	render() {
		const siteTitle = get(this, 'props.data.site.siteMetadata.title')
		const post = get(this, 'props.data.allFile.edges')[0].node
			.childMarkdownRemark

		return (
			<div>
				<Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
				<h1>{post.frontmatter.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
			</div>
		)
	}
}

export default BlogPostTemplate

export const pageQuery = graphql`
	query BlogPostBySlug($name: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		allFile(filter: { name: { eq: $name } }) {
			edges {
				node {
					childMarkdownRemark {
						frontmatter {
							title
							id
						}
						html
					}
				}
			}
		}
	}
`
