import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
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

class App extends React.Component {
	render() {
		return (
				<Router>
					<div className="main">
						<Header />	
						<div className="container">
							<Route exact path="/" component={HomePage}/>
						 	<Route path="/about" component={AboutPage}/>
						 	<Route path="/contacts" component={ContactsPage}/>
						 	<Route path="/login" component={LoginPage}/>
						</div>
					</div>
				</Router>
			);
	}
}

class HomePage extends React.Component {
	render() {
		return (
				<div className="home-page">
					<h1>Hello cruel world!</h1>
					<Posts />	
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
	render() {
		return (
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
						<form>
							<div className="form-group">
								<input className="form-control" placeholder="Login"/>
							</div>
							<div className="form-group">
								<input className="form-control" placeholder="Password"/>
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

const Header = () => {
	return (
			<header className="navbar navbar-inverse">
				<div className="container">
			      <div className="navbar-header"><a className="navbar-brand">Brand</a></div>
				  <div className="collapse navbar-collapse">
				    <ul className="nav navbar-nav">
				    	<li><Link to="/">Home</Link></li>
				    	<li><Link to="/about">About</Link></li>
				    	<li><Link to="/contacts">Contacts</Link></li>
				  	</ul>
				  	<ul className="nav navbar-nav navbar-right">
				  		<li><Link to="/login">Login</Link></li>
				  	</ul>
			   	  </div>
			    </div>
			</header>
		)
}


render(<App />, document.getElementById('root'))