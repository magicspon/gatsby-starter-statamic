import React from 'react'
import Img from 'gatsby-image'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { css } from 'emotion'

class GalleryIndex extends React.Component {
	render() {
		const siteTitle = get(this, 'props.data.site.siteMetadata.title')
		const posts = get(this, 'props.data.allMarkdownRemark.edges')[0].node

		const {
			frontmatter: { images, title }
		} = posts

		return (
			<div>
				<Helmet title={siteTitle} />
				<h1>{title}</h1>
				<div className={css(tw('flex flex-wrap'))}>
					{images.map((img, index) => (
						<div key={index} className={css(tw('bg-red w-full mb-2'))}>
							{/* <Img sizes={img.childImageSharp.sizes} /> */}
							hello
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default GalleryIndex

export const galleryQuery = graphql`
	query GalleryQuery {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(filter: { frontmatter: { title: { eq: "Gallery" } } }) {
			edges {
				node {
					id
					frontmatter {
						images {
							childImageSharp {
								sizes {
									base64
									tracedSVG
									aspectRatio
									src
									srcSet
									srcWebp
									srcSetWebp
									sizes
									originalImg
									originalName
								}
							}
						}
						title
					}
				}
			}
		}
	}
`
