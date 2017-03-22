import React from 'react';

const Admin = (props) => {

	const { addTopping, toppings, onChangeTopping } = props;

	const handleSubmit = e => {
		e.preventDefault();
		const target = e.target;
		
		const name = target.name.value;
		const available = !!target.available.value;
		const price = +target.price.value;
		const topping = {
			name,
			available,
			price
		}		

		addTopping(topping)
	}

	const editTop = (key, name, value) => {
		// onChangeTopping(e.target.name, e.target.value);
		console.log(key, name, value);
	}

	const renderEdit = (key) => {
		

		return (

				<div className="topping" key={key}>
					<div className="form-group">
						<input type="text" className="form-control" name="name" value={key} onChange={e => onChangeTopping(key, e.target.name, e.target.value)}/>
					</div>
					<div className="form-group">
						<select name="available" className="form-control" value={toppings[key]['available']} onChange={e => onChangeTopping(key, e.target.name, e.target.value)}>
							<option value="available">available</option>
							<option value="unavailable">unavailable</option>
						</select>
					</div>
					<div className="form-group">
						<input name="price" type="text" className="form-control" value={toppings[key]['price']} onChange={e => onChangeTopping(key, e.target.name, e.target.value)}/>
					</div>
				</div>

			)
	}

	return (

			<div className="admin">

				<h2>admin</h2>

				<h3>Add topping</h3>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input type="text" className="form-control" name="name" required/>
					</div>
					<div className="form-group">
						<select name="available" className="form-control" required>
							<option value="true">available</option>
							<option value="">unavailable</option>
						</select>
					</div>
					<div className="form-group">
						<input type="number" min="0" step="0.01" className="form-control" name="price" required/>
					</div>
					<button type="submit" className="btn btn-success">Add Topping</button>
				</form>
				<br/>
				<br/>

				{Object.keys(toppings).map(renderEdit)}

				

			</div>

		)
}

export default Admin;