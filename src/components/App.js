import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import base from './../constants/constants';
import { logOut } from './../helpers/auth';

import Header from './common/Header';
import AboutPage from './about/AboutPage';
import ContactsPage from './contacts/ContactsPage';

import HomePage from './home/HomePage';

import Dashboard from './protected/Dashboard'
import AdminPage from './protected/AdminPage'


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tasks: {},
			authed: false,
			loaded: false
		};

		this.logOut = this.logOut.bind(this);
	}


	componentDidMount() {
		base.syncState(`posts`, {
			context: this,
			state: 'tasks',
			then: () => {
				this.setState({
					loaded: true
				})
			}
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
		logOut();
	}

	render() {
		
		return (
				<Router>
					<div className="main">
						<Header authed={this.state.authed} logOut={this.logOut}/>	
						<div className="container">
						<Switch>
							<Route exact path="/" render={ (props) => {								
								return <HomePage tasks={this.state.tasks} loaded={this.state.loaded}/>
							}}/>
						 	<Route path="/about" component={AboutPage}/>
						 	<Route path="/contacts" component={ContactsPage}/>
						 	<PublicRoute authed={this.state.authed} path="/login" component={LoginPage}/>
						 	<PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
						 	<PrivateRoute authed={this.state.authed} path='/admin' component={AdminPage} />
						 	<Route render={() => <h3>No Match</h3>} />
						</Switch>
						</div>
					</div>
				</Router>
			);
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
		console.log(error.message);
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

const PublicRoute = ({component: Component, authed, ...rest}) => {
  console.log(authed)
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
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

export default App;