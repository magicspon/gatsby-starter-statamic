import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { css } from 'emotion'

import Bio from '../components/Bio'

class BlogIndex extends React.Component {
	render() {
		const siteTitle = get(this, 'props.data.site.siteMetadata.title')
		const posts = get(this, 'props.data.allMarkdownRemark.edges')

		return (
			<div>
				<Helmet title={siteTitle} />
				{/* <Bio />
				{posts.map(({ node }, index) => {
					const title = get(node, 'frontmatter.title') || node.fields.slug
					return (
						<div key={index} className={css(tw('bg-black'))}>
							<h3 className={css(tw('bg-black text-white'))}>{title}</h3>
							<small>{node.frontmatter.date}</small>
							<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
						</div>
					)
				})} */}
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
		allMarkdownRemark {
			edges {
				node {
					excerpt
					fields {
						template
					}
					frontmatter {
						title
					}
				}
			}
		}
	}
`
