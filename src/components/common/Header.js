import React from 'react';
import { Link } from 'react-router-dom';


const Header = (props) => {
	const logOutUser = (e) => {
		e.preventDefault();
		props.logOut();
	} 
	return (
			<header className="navbar navbar-inverse">
				<div className="container">
			      <div className="navbar-header"><Link to="/" className="navbar-brand">Brand</Link></div>
				  <div className="collapse navbar-collapse">
				    <ul className="nav navbar-nav">
				    	<li><Link to="/">Home</Link></li>
				    	<li><Link to="/about">About</Link></li>
				    	<li><Link to="/contacts">Contacts</Link></li>
				    	<li><Link to="/dashboard">Dashboard</Link></li>
				  	</ul>

			  			{props.authed ? 
			  				<ul className="nav navbar-nav navbar-right">
			  					<li><Link to="/admin">Admin Page</Link></li>
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

export default Header;