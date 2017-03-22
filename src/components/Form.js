import React from 'react';
import Topping from './Topping';
import Size from './Size';


const Form = (props) => {
	
	const { crusts, toppings, order, pizzaKey, toggleTopping, selectSize, addPizza, removePizza } = props;

	const renderTopping = (key) => {
		return <Topping key={key} toppingName={key} topping={toppings[key]} toggleTopping={ toggleTopping } pizzaKey={pizzaKey}/>;
	};

	const renderCrusts = (key) => {
		return <Size key={key} crustName={key} order={order} selectSize={selectSize} pizzaKey={pizzaKey}/>
	};

	return (
			<div className="form">
				<h4>
					<button className="btn btn-danger btn-sm pull-right" onClick={removePizza.bind(null, pizzaKey)}>
						<span className="glyphicon glyphicon-remove"/>
					</button>
					{pizzaKey}
				</h4>
				<br/>
				<h5>Select the size *</h5>
				<div className="size">
					{Object.keys(crusts).map(renderCrusts)}
				</div>
				<br/>
				<div className="toppings">
					<h5>Toppings</h5>
					{Object.keys(toppings).map(renderTopping)}
				</div>
				<br/>
			</div>
		)
}

export default Form;