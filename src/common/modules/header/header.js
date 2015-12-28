import './header.less'
import React from 'react'
import ReactDom from 'react-dom'

class Header extends React.Component{

	constructor(props){
		super(props)
	}

	render(){
		return (<header className="site-header">This is a common header</header>)
	}
}

module.exports = Header

