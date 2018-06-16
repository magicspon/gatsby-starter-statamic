import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { css } from 'emotion'

class BlogIndex extends React.Component {
	render() {
		const siteTitle = get(this, 'props.data.site.siteMetadata.title')
		const posts = get(this, 'props.data.allFile.edges')
		return (
			<div>
				<Helmet title={siteTitle} />

				{posts.map(({ node }, index) => {
					const title = get(node, 'childMarkdownRemark.frontmatter.title')
					const link = `/blog/${get(node, 'name').split('.')[1]}/`
					return (
						<div
							key={get(node, 'childMarkdownRemark.frontmatter.id')}
							className={css(tw('mb-2'))}
						>
							<h3>{title}</h3>
							<p
								dangerouslySetInnerHTML={{
									__html: node.childMarkdownRemark.excerpt
								}}
							/>
							<Link to={link}>Read more</Link>
						</div>
					)
				})}
			</div>
		)
	}
}

export default BlogIndex

export const pageQuery = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title
			}
		}
		allFile(
			limit: 3
			filter: { sourceInstanceName: { eq: "blog" }, name: { ne: "folder" } }
		) {
			edges {
				node {
					name
					childMarkdownRemark {
						frontmatter {
							title
							id
						}
						excerpt
						html
					}
				}
			}
		}
	}
`
