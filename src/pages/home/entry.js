import './index.less'

import React from 'react'
import ReactDom from 'react-dom'
import Header from 'commonModules/header/header.js'

class Home extends React.Component {

	constructor(props){
		super(props)
	}

	render(){
		let self = this
		return (<div className="pageMain">
					<Header channel="home"></Header>
					<span>hello world</span>
				</div>)
	}
}

ReactDom.render(
		<Home></Home>
		,document.querySelector('#container')
	)