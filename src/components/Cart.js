import React from 'react';

const Cart = (props) => {
	console.log(props)


	const { toppings, crusts, order } = props;

	
	let total = 0;

	function renderTopping(key) {

		if(toppings[key]["available"]) {
			total += toppings[key]["price"];	
		}
		

		return (
				<li key={key}>
					{
						toppings[key]["available"] ? 
						<span>{key} {toppings[key]["price"]}</span>
						:
						<span>{key} not available</span>
					}
				</li>
			)
	}




	function renderPrice(key) {

		total += crusts[order[key]["size"]]["base"]

		return (
				<div className="pizza" key={key}>
					<h4>Pizza {order[key]["size"]}</h4>
					<div className="toppings">
						{Object.keys(order[key]["toppings"]).map(renderTopping)}
					</div>
				</div>
			)
	}



	return (
			<div className="cart">

				<h2>Cart</h2>

				{Object.keys(order).map(renderPrice)}

				total: {total.toFixed(2)}
			</div>
		)
}

export default Cart;