import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Bio from '../components/Bio'

class SinglePostTemplate extends React.Component {
	render() {
		console.log(this.props)
		return (
			<div>
				{/* <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
				<h1>{post.frontmatter.title}</h1>
				<p>{post.frontmatter.date}</p>
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
				<hr />
				<Bio />

				<ul>
					{previous && (
						<li>
							<Link to={previous.fields.slug} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						</li>
					)}

					{next && (
						<li>
							<Link to={next.fields.slug} rel="next">
								{next.frontmatter.title} →
							</Link>
						</li>
					)}
				</ul> */}
			</div>
		)
	}
}

export default SinglePostTemplate

export const pageQuery = graphql`
	query SinglePostBySlug($relativeDirectory: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		allFile(filter: { relativeDirectory: { eq: $relativeDirectory } }) {
			edges {
				node {
					sourceInstanceName
					relativeDirectory
					childMarkdownRemark {
						frontmatter {
							id
							title
						}
						html
					}
				}
			}
		}
	}
`
