import React, { Component } from "react";
import "./login.css";

import { Link } from "react-router-dom";

class Register extends Component {
	state = {
		username: "",
		password: ""
	};

	sendUserData = () => {
		console.log(this.state);
		let body = {
			username: this.state.username,
			password: this.state.password
		};

		return fetch("http://localhost:5000/user", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(ret => {
				console.log(ret);
				if (ret["status"] === "identical") {
					alert("This username existed");
				} else {
					window.location.replace("http://localhost:3000/login");
				}
			});
	};

	render() {
		return (
			<div className="center">
				<div className="card">
					<h1>Register</h1>
					<input
						className="form-item"
						placeholder="Username goes here..."
						name="username"
						type="text"
						value={this.state.username}
						onChange={e => {
							this.setState({
								username: e.target.value
							});
						}}
					/>
					<input
						className="form-item"
						placeholder="Password goes here..."
						name="password"
						type="password"
						value={this.state.password}
						onChange={e => {
							this.setState({
								password: e.target.value
							});
						}}
					/>
					<button className="btn form-submit" onClick={this.sendUserData}>
						REGISTER
					</button>
				</div>
			</div>
		);
	}

	// handleChange(e) {
	// 	this.setState({
	// 		[e.target.name]: e.target.value
	// 	});
	// }

	// handleFormSubmit(e) {
	// 	e.preventDefault();

	// 	this.Auth.login(this.state.username, this.state.password)
	// 		.then(res => {
	// 			this.props.history.replace("/admin/dashboard");
	// 		})
	// 		.catch(err => {
	// 			alert(err);
	// 		});
	// }
}

export default Register;
