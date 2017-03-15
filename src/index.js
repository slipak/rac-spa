import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.css';

import Rebase from 're-base';


var config = {
  apiKey: "AIzaSyCvfMMD6rFIX12XM2qVqwfH1MeyixfbGiw",
  authDomain: "rac-spa.firebaseapp.com",
  databaseURL: "https://rac-spa.firebaseio.com",
  storageBucket: "rac-spa.appspot.com",
  messagingSenderId: "611734579218"
};

const base = Rebase.createClass(config);

class Posts extends React.Component {

	constructor() {
		super();

		this.state = {
			posts : {}
		}


		this.renderPost = this.renderPost.bind(this);

	}

	componentDidMount() {
		base.syncState(`posts`, {
		    context: this,
		    state: 'posts'
		  });
	}

	renderPost(key) {
		return <Post post={this.state.posts[key]} key={key} />
	}

	render() {
		return (
				<div className="row">
					{Object.keys(this.state.posts).map(this.renderPost)}
				</div>
			)
	}
}

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

class Dashboard extends React.Component {
	render() {
		return (
				<h1>Dashboard</h1>
			)
	}
}


class App extends React.Component {

	constructor() {
		super();

		this.state = {
			po: {},
			authed: false
		};
		this.logOut = this.logOut.bind(this)
	}


	componentDidMount() {
		base.syncState(`posts`, {
			context: this,
			state: 'po'
		});

		base.onAuth((user) => {
			if(user) {
				this.setState({
		          authed: true
		        })
			} else {
				this.setState({
		          authed: false
		        })
			}

		})
	}


	logOut() {
		base.unauth();
	}

	render() {
		return (
				<Router>
					<div className="main">
						<Header authed={this.state.authed} logOut={this.logOut}/>	
						<div className="container">
						<Switch>
							<Route exact path="/" component={HomePage} posts={this.state.po}/>
						 	<Route path="/about" component={AboutPage}/>
						 	<Route path="/contacts" component={ContactsPage}/>
						 	<Route path="/login" component={LoginPage}/>
						 	<PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
						 	<PrivateRoute authed={this.state.authed} path='/posts-admin' component={PostsAdmin} />
						 	<Route render={() => <h3>No Match</h3>} />
						</Switch>
						</div>
					</div>
				</Router>
			);
	}
}

class HomePage extends React.Component {
	render() {
		console.log(this.props)
		return (
				<div className="home-page">
					<h1>Hello cruel world!</h1>
					<Posts />	
				</div>
			)
	}
}

class PostsAdmin extends React.Component {
	render() {
		return (
				<div className="posts-page">
					posts
				</div>
			)
	}
}

class AboutPage extends React.Component {
	render() {
		return (
				<div className="about-page">
					<h1>AboutPage</h1>
				</div>
			)
	}
}

class ContactsPage extends React.Component {
	render() {
		return (
				<div className="contacts-page">
					<h1>ContactsPage</h1>
				</div>
			)
	}
}


class LoginPage extends React.Component {
	constructor() {
		super();

		this.loginUser = this.loginUser.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.errorHandler = this.errorHandler.bind(this);
	}

	errorHandler(error) {
		// TODO
		throw error;
	}
	


	authHandler (error, user) {
		if(error) this.errorHandler(error);
		
	}

	loginUser(e) {
		e.preventDefault();

		const email = this.email.value;
		const password = this.password.value;

		base.authWithPassword({
			email,
			password
		}, this.authHandler)
	}

	render() {
		return (
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
						<form onSubmit={this.loginUser}>
							<div className="form-group">
								<input type="email" className="form-control" placeholder="Login" ref={(input) => this.email = input}/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Password" ref={(input) => this.password = input}/>
							</div>
							<div className="btn-groupt">
								<button className="btn btn-default">Send</button>
							</div>
						</form>
					</div>
				</div>
			)
	}
}

const Header = (props) => {
	const logOutUser = (e) => {
		e.preventDefault();
		props.logOut();
	} 
	return (
			<header className="navbar navbar-inverse">
				<div className="container">
			      <div className="navbar-header"><a className="navbar-brand">Brand</a></div>
				  <div className="collapse navbar-collapse">
				    <ul className="nav navbar-nav">
				    	<li><Link to="/">Home</Link></li>
				    	<li><Link to="/about">About</Link></li>
				    	<li><Link to="/contacts">Contacts</Link></li>
				    	<li><Link to="/dashboard">Dashboard</Link></li>
				  	</ul>
				  	
			  			{props.authed ? 
			  				<ul className="nav navbar-nav navbar-right">
			  					<li><Link to="/posts-admin">Add Post</Link></li>
			  					<li><a href="#" onClick={logOutUser}>Logout</a></li>			  					
			  				</ul>
			  				:
			  				<ul className="nav navbar-nav navbar-right">
			  					<li><Link to="/login">Login</Link></li>
		  					</ul>
				  		}
			   	  </div>
			    </div>
			</header>
		)
}




const PublicRoute = () => {
	
}

const PrivateRoute = ({component: Component, authed, ...rest}) => {
	return (
		<Route
			{...rest}
			render={(props) => authed === true
			? <Component {...props} />
			: <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
		/>
	)
}




render(<App />, document.getElementById('root'))