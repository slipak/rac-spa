import React from 'react';


const Post = (props) => {
	
	const post = props.post;
	
	return (
			<div className="col-xs-12 col-sm-4">
				<h2>{post.title}</h2>
				<div className="text">
					{post.text}
				</div>
				<br/>	
				<div className="btn-group inline">
					<a className="btn btn-default">Read more</a>
					<a className="btn btn-primary">Likes {post.likes}</a>
				</div>
			</div>
		)
}

export default Post;