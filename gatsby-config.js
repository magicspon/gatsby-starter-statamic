module.exports = {
	siteMetadata: {
		title: 'Gatsby Statamic Starter',
		author: 'Dave Stockley'
	},
	plugins: [
		'gatsby-plugin-react-next',
		{
			resolve: 'gatsby-spon-scss-postcss'
		},
		{
			resolve: 'gatsby-plugin-emotion',
			options: {
				hoist: false,
				sourceMap: false,
				autoLabel: false,
				labelFormat: '[local]',
				extractStatic: true,
				outputDir: '',
				importedNames: {
					styled: 'styled',
					css: 'css',
					keyframes: 'keyframes',
					injectGlobal: 'injectGlobal',
					merge: 'merge'
				}
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/site/content/pages/`,
				name: 'pages'
			}
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 590
						}
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: 'margin-bottom: 1.0725rem'
						}
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants'
				]
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		// {
		// 	resolve: 'gatsby-plugin-google-analytics',
		// 	options: {
		// 		// trackingId: `ADD YOUR TRACKING ID HERE`,
		// 	}
		// },
		// 'gatsby-plugin-offline',
		'gatsby-plugin-react-helmet'
	]
}
