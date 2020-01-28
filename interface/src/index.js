import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/login";
import Register from "components/register";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/admin" render={props => <AdminLayout {...props} />} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Redirect from="/" to="/admin/dashboard" />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

serviceWorker.unregister();
