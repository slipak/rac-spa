import React from 'react';


const Size = (props) => {
	const { crustName, selectSize, pizzaKey, order } = props;
	return (			
			<label className="radio-inline">
			  <input name={pizzaKey}  
			  type="radio" value={crustName} onChange={e => selectSize(e.currentTarget.value, pizzaKey)}
			  checked={order[pizzaKey]["size"] === crustName}
			  /> {crustName}
			</label>
		)
};


export default Size;