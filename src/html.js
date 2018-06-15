/* eslint import/no-unresolved:"off" */
/* eslint import/extensions:"off" */
/* eslint global-require:"off" */
import React from 'react'

let inlinedStyles = ''

if (process.env.NODE_ENV === 'production') {
	try {
		/* eslint import/no-webpack-loader-syntax: off */
		inlinedStyles = require('!raw-loader!../public/styles.css')
	} catch (e) {
		/* eslint no-console: "off" */
		console.error(e)
	}
}

export default class HTML extends React.Component {
	render() {
		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					{this.props.headComponents}
					{/* <link rel="shortcut icon" href={favicon} /> */}
				</head>
				<body>
					<div
						id="___gatsby"
						dangerouslySetInnerHTML={{ __html: this.props.body }}
					/>
					{this.props.postBodyComponents}
				</body>
			</html>
		)
	}
}
