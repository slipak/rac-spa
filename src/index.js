import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import OrderPage from './components/OrderPage';

class App extends React.Component {
	render() {
		return (
				<div className="main">	
					<div className="container">
						<h1>Hello cruel world!</h1>
						<br/>
						<br/>
						<OrderPage />
					</div>
				</div>
			);
	}
}

render(<App />, document.getElementById('root'))