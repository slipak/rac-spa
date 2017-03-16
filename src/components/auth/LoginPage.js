import React from 'react';

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

export default LoginPage;