import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import AuthService from "../AuthService";
import withAuth from "../withAuth";
import { withRouter } from "react-router-dom";
const Auth = new AuthService();

class AdminNavbarLinks extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.handleLogout = this.handleLogout.bind(this);
	// 	this.state = {
	// 		history: this.props.history
	// 	};
	// }

	render() {
		const notification = (
			<div>
				<i className="fa fa-globe" />
				<b className="caret" />
				<span className="notification">5</span>
				<p className="hidden-lg hidden-md">Notification</p>
			</div>
		);
		return (
			<div>
				<Nav>
					<NavItem eventKey={1} href="#">
						<i className="fa fa-dashboard" />
						<p className="hidden-lg hidden-md">Dashboard</p>
					</NavItem>
					<NavDropdown
						eventKey={2}
						title={notification}
						noCaret
						id="basic-nav-dropdown"
					>
						<MenuItem eventKey={2.1}>Notification 1</MenuItem>
						<MenuItem eventKey={2.2}>Notification 2</MenuItem>
						<MenuItem eventKey={2.3}>Notification 3</MenuItem>
						<MenuItem eventKey={2.4}>Notification 4</MenuItem>
						<MenuItem eventKey={2.5}>Another notifications</MenuItem>
					</NavDropdown>
					<NavItem eventKey={3} href="#">
						<i className="fa fa-search" />
						<p className="hidden-lg hidden-md">Search</p>
					</NavItem>
				</Nav>
				<Nav pullRight>
					<NavItem eventKey={1} href="#">
						Account
					</NavItem>
					<NavDropdown
						eventKey={2}
						title="Dropdown"
						id="basic-nav-dropdown-right"
					>
						<MenuItem eventKey={2.1}>Action</MenuItem>
						<MenuItem eventKey={2.2}>Another action</MenuItem>
						<MenuItem eventKey={2.3}>Something</MenuItem>
						<MenuItem eventKey={2.4}>Another action</MenuItem>
						<MenuItem eventKey={2.5}>Something</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={2.5}>Separated link</MenuItem>
					</NavDropdown>
					<NavItem eventKey={3} onClick={this.handleLogout.bind(this)}>
						Log out
					</NavItem>
				</Nav>
			</div>
		);
	}

	handleLogout = () => {
		localStorage.removeItem("id_token");
		console.log("props", this.props.history);
		this.props.history.replace("/login");
	};
}

export default withRouter(withAuth(AdminNavbarLinks));
