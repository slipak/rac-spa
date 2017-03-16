import React from 'react';

import Post from './Post'

import Spinner from 'react-spinner';

class Posts extends React.Component {
	renderPost(key) {
		return <Post post={this.props.tasks[key]} key={key} />
	}

	render() {
		
		return (
				<div className="asd">
					{	this.props.loaded ? 
						<div className="row">
							{Object.keys(this.props.tasks).map(this.renderPost.bind(this))}
						</div>						
						:
						<div className="row">
							<Spinner />
						</div>							
					}
				</div>
			)
	}
}

export default Posts;