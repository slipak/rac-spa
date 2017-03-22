import React from 'react';

import Cart from './Cart';
import Admin from './Admin';
import Form from './Form'

import base from './../constants/firebase';

export default class OrderPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			crusts: {},
			toppings: {},
			order: {}
		}

		this.toggleTopping = this.toggleTopping.bind(this);
		this.selectSize = this.selectSize.bind(this);
		this.addPizza = this.addPizza.bind(this);
		this.removePizza = this.removePizza.bind(this);
		this.renderPizza = this.renderPizza.bind(this);
		this.addTopping = this.addTopping.bind(this);
		this.onChangeTopping = this.onChangeTopping.bind(this);
	
	}



	componentDidMount() {
		base.bindToState('toppings', {
			context: this,
    		state: 'toppings'
		})
		base.bindToState('crusts', {
			context: this,
    		state: 'crusts'
		})
	}



	addPizza() {
		var timestamp = (new Date).getTime();
		this.state.order['pizza-' + timestamp] = {
			size: 'small',
			toppings: {}
		};
		this.setState({
			order: this.state.order
		})
	}


	removePizza(key) {
		delete this.state.order[key]
		this.setState({
			order: this.state.order
		})
	}

	renderPizza(key) {
		return (
				<Form
					key={key}
					pizzaKey={key}
					
					toppings={this.state.toppings} 
					crusts={this.state.crusts}
					order={this.state.order}
					
					toggleTopping={this.toggleTopping}
					selectSize={this.selectSize}

					removePizza={this.removePizza}
				/>
			)
	}

	selectSize(size, pizzaKey) {
		this.state.order[pizzaKey]["size"] = size;
		this.setState({
			order: this.state.order
		})
	}

	toggleTopping(checked, value, pizzaKey) {
		if(checked) {
			this.state.order[pizzaKey]["toppings"][value] = 1;
		} else {
			delete this.state.order[pizzaKey]["toppings"][value];
		}
		this.setState({
			order: this.state.order
		})
	}


	addTopping(topping) {
		if(this.state.toppings[topping.name]) {
			console.log("this topping already exist");
			return;
		}

		this.state.toppings[topping.name] = {
			available: topping.available,
			price: topping.price
		}

		this.setState({
			toppings: this.state.toppings
		})
	}


	onChangeTopping(key, name, value) {
		
		if(this.state.toppings[key][name] !== value) {
			this.state.toppings[key][name] = value;
            this.setState({
                toppings: this.state.toppings
            });
		}
		/*if(this.state.toppings[name] === value) {
			this.state
		}*/

		/*if (this.state.name !== currentValue) {
            this.state.fishes[key][fieldName] = currentValue;
            this.setState({
                fishes: this.state.fishes
            });
        }*/
	}

	render() {
		return (
				<div className="order-page">
					<div className="row">
						<div className="col-xs-4">
							<h2>
								Choose your pizzas
								<button onClick={this.addPizza} className="btn btn-primary pull-right">Add Pizza</button>
							</h2>
							<br/>
							<br/>
							{Object.keys(this.state.order).map(this.renderPizza)}

							
						</div>
						<div className="col-xs-4">
							<Cart toppings={this.state.toppings} crusts={this.state.crusts} order={this.state.order}/>
						</div>
						<div className="col-xs-4">
							<Admin 
								toppings={this.state.toppings} 
								crusts={this.state.crusts}
								addTopping={this.addTopping}
								onChangeTopping={this.onChangeTopping}
							/>
						</div>
					</div>
				</div>
			)
	}
}