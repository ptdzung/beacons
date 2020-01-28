import React, { Component } from "react";
import "./login.css";
import AuthService from "./AuthService";

import { Link } from "react-router-dom";

class Login extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.Auth = new AuthService();
	}

	componentWillMount() {
		if (this.Auth.loggedIn()) this.props.history.replace("/admin/dashboard");
	}

	render() {
		return (
			<div className="center">
				<div className="card">
					<h1>Login</h1>
					<form onSubmit={this.handleFormSubmit}>
						<input
							className="form-item"
							placeholder="Username goes here..."
							name="username"
							type="text"
							onChange={this.handleChange}
						/>
						<input
							className="form-item"
							placeholder="Password goes here..."
							name="password"
							type="password"
							onChange={this.handleChange}
						/>
						<input className="btn form-submit" value="SUBMIT" type="submit" />
						<br />
						<Link to="/register" className="btn form-submit">
							REGISTER
						</Link>
					</form>
				</div>
			</div>
		);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleFormSubmit(e) {
		e.preventDefault();

		this.Auth.login(this.state.username, this.state.password)
			.then(res => {
				this.props.history.replace("/admin/dashboard");
			})
			.catch(err => {
				alert(err);
			});
	}
}

export default Login;
