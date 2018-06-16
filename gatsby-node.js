const R = require('ramda')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// gatsby-node.js
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators
	/*
	const single = new Promise((resolve, reject) => {
		const blogPost = path.resolve('./src/templates/single.js')
		resolve(
			graphql(
				`
					{
						allFile(filter: { sourceInstanceName: { eq: "single" } }) {
							edges {
								node {
									sourceInstanceName
									relativeDirectory
									childMarkdownRemark {
										id
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
			).then(result => {
				if (result.errors) {
					console.log(result.errors)
					reject(result.errors)
				}

				const posts = result.data.allFile.edges

				R.forEach(post => {
					const {
						node: { relativeDirectory }
					} = post

					const slug =
						relativeDirectory === '' ? '/' : relativeDirectory.split('.')[1]

					createPage({
						path: slug,
						component: blogPost,
						relativeDirectory,
						context: {
							slug,
							relativeDirectory
						}
					})
				})(posts)
			})
		)
	})
	*/

	const blog = new Promise((resolve, reject) => {
		const blogPost = path.resolve('./src/templates/blog-post.js')
		resolve(
			graphql(
				`
					{
						allFile(
							filter: {
								sourceInstanceName: { eq: "blog" }
								name: { ne: "folder" }
							}
						) {
							edges {
								node {
									sourceInstanceName
									name
									childMarkdownRemark {
										id
										frontmatter {
											title
											id
										}
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

				const posts = result.data.allFile.edges

				R.compose(
					R.forEach(post => {
						const {
							node: { name }
						} = post

						const slug = `/blog/${name.split('.')[1]}/`

						createPage({
							path: slug,
							component: blogPost,
							context: {
								slug,
								name
							}
						})
					}),
					R.filter(post => post.node.childMarkdownRemark.frontmatter),
					R.filter(post => post.node.childMarkdownRemark)
				)(posts)
			})
		)
	})

	return Promise.all([blog])
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
	const { createNodeField } = boundActionCreators

	fmImagesToRelative(node)

	if (node.internal.type === 'MarkdownRemark') {
		const value = createFilePath({ node, getNode })

		createNodeField({
			name: 'slug',
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
