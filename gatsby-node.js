const R = require('ramda')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators

	return new Promise((resolve, reject) => {
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
						node: {
							relativeDirectory,
							childMarkdownRemark: {
								frontmatter: { title, id }
							}
						}
					} = post

					const slug =
						relativeDirectory === '' ? '/' : relativeDirectory.split('.')[1]

					createPage({
						path: slug,
						component: blogPost,
						relativeDirectory,
						context: {
							title,
							id,
							slug,
							relativeDirectory
						}
					})
				})(posts)
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
