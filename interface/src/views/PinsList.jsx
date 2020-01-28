import React, { Component } from "react";

import "../assets/css/demo.css";

class PinsList extends Component {
	state = {
		pins: []
	};

	getDatabase = () => {
		return fetch("http://localhost:5000/database", {
			method: "GET"
		})
			.then(response => {
				return response.json();
			})
			.then(ret => {
				this.setState({ pins: ret });
				console.log(this.state.pins);
			});
	};

	handleRemove = pin => {
		return fetch("http://localhost:5000/database", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json"
			},
			body: JSON.stringify(pin)
		}).then(response => {
			this.getDatabase();
			return response.json();
		});
	};

	componentWillMount() {
		this.getDatabase();
	}

	render() {
		return (
			<div className="content">
				<table className="table table-hover">
					<thead className="table-dark">
						<tr className="d-flex">
							<th className="col">Name</th>
							<th className="col">UUID</th>
							<th className="col">Major</th>
							<th className="col">Minor</th>
							<th className="col">txPower</th>
							<th className="col" />
						</tr>
					</thead>
					<tbody>
						{this.state.pins.map(pin => (
							<tr>
								<td className="col">{pin["name"]}</td>
								<td className="col">{pin["uuid"]}</td>
								<td className="col">{pin["major"]}</td>
								<td className="col">{pin["minor"]}</td>
								<td className="col">{pin["tx"]}</td>
								<td className="col">
									<button
										className="btn"
										onClick={() => this.handleRemove(pin)}
									>
										Remove
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default PinsList;
