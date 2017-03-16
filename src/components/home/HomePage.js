import React from 'react';
import Posts from './../posts/Posts';

class HomePage extends React.Component {
	render() {
		return (
				<div className="home-page">
					<h1>Hello cruel world!</h1>
					<Posts tasks={this.props.tasks} loaded={this.props.loaded}/>	
				</div>
			)
	}
}

export default HomePage;