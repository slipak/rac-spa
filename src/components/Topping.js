import React from 'react';

const Topping = (props) =>  {
	const { name, available, price } = props.topping;
	const toggleTopping = props.toggleTopping;
	const pizzaKey = props.pizzaKey;
	const toppingName = props.toppingName;
	
 	return (			
			<label className="checkbox-inline">
			  <input disabled={!available} type="checkbox" value={toppingName} onChange={e => toggleTopping(e.currentTarget.checked, e.currentTarget.value, pizzaKey)}/> {toppingName}
			</label>
		)
}

export default Topping;