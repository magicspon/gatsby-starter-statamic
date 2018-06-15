const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators

	return new Promise((resolve, reject) => {
		const blogPost = path.resolve('./src/templates/blog-post.js')
		resolve(
			graphql(
				`
					{
						allMarkdownRemark {
							edges {
								node {
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
			).then(result => {
				if (result.errors) {
					console.log(result.errors)
					reject(result.errors)
				}

				// Create blog posts pages.
				const posts = result.data.allMarkdownRemark.edges

				_.each(posts, (post, index) => {
					const previous =
						index === posts.length - 1 ? null : posts[index + 1].node
					const next = index === 0 ? null : posts[index - 1].node

					createPage({
						path: post.node.fields.template,
						component: blogPost,
						context: {
							template: post.node.fields.template,
							previous,
							next
						}
					})
				})
			})
		)
	})
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
	const { createNodeField } = boundActionCreators

	if (node.internal.type === 'MarkdownRemark') {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: 'template',
			node,
			value
		})
	}
}

exports.modifyWebpackConfig = ({ config }) => {
	config.merge({
		resolve: {
			alias: {
				'@': `${__dirname}/src`
			}
		}
	})
}
