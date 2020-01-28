import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Pins from "components/Pin/Pins.jsx";
import logo from "assets/img/dudu.svg";
import { legendMap } from "variables/Variables";

class Beacons extends Component {
	state = {
		name: null,
		x: null,
		y: null,
		major: null,
		minor: null,
		uuid: null,
		tx: null,
		pins: [],
		hovered: {}
	};

	getPinData = () => {
		console.log(this.state);

		let body = {
			name: this.state.name,
			x: this.state.x,
			y: this.state.y,
			major: this.state.major,
			minor: this.state.minor,
			uuid: this.state.uuid,
			tx: this.state.tx
		};

		return fetch("http://localhost:5000/pin", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				this.getDatabase();
				return response.json();
			})
			.then(ret => {
				console.log(ret);
				if (ret === "no") {
					alert("Input exceeds limit");
				}
			});
	};

	getDatabase = () => {
		return fetch("http://localhost:5000/pin", {
			method: "GET"
		})
			.then(response => {
				return response.json();
			})
			.then(ret => {
				// const pins = [...this.state.pins];
				// pins = ret;
				this.setState({ pins: ret });
				console.log(this.state.pins);
			});
	};

	handleHover = pin => {
		const pins = [...this.state.pins];
		for (let i = 0; i < pins.length; i++) {
			if (pins[i][2] === pin[2]) {
				this.setState({ hovered: pin[2] });
			}
		}
	};

	componentWillMount() {
		this.getDatabase();
	}

	createLegend(json) {
		var legend = [];
		for (var i = 0; i < json["names"].length; i++) {
			var type = "fa fa-circle text-" + json["types"][i];
			legend.push(<i className={type} key={i} />);
			legend.push(" ");
			legend.push(json["names"][i]);
		}
		return legend;
	}

	render() {
		return (
			<div className="content">
				<Grid fluid>
					<Row>
						<Col lg={9} sm={12}>
							<Card
								id="floorPlan"
								title="Floor Plan"
								category="Conera JSC."
								content={
									<div>
										<img
											className="card-img-overlay"
											src={logo}
											alt="Floor Plan"
										/>
										<Pins pins={this.state.pins} onHover={this.handleHover} />
									</div>
								}
								legend={
									<div className="legend">{this.createLegend(legendMap)}</div>
								}
							/>
						</Col>
						<Col lg={3} sm={12}>
							<div className="card" style={{ height: "100" }}>
								&ensp;Name:
								<input
									type="text"
									name="name"
									size="27"
									value={this.state.name}
									onChange={e => {
										this.setState({
											name: e.target.value
										});
									}}
								/>
								<br />
								&ensp;x:
								<input
									type="text"
									name="x"
									size="12"
									value={this.state.x}
									onChange={e => {
										this.setState({
											x: e.target.value
										});
									}}
								/>
								&emsp;y:
								<input
									type="text"
									name="y"
									size="12"
									value={this.state.y}
									onChange={e => {
										this.setState({
											y: e.target.value
										});
									}}
								/>
								<br />
								&ensp;Major:
								<input
									type="text"
									name="major"
									size="8"
									value={this.state.major}
									onChange={e => {
										this.setState({
											major: e.target.value
										});
									}}
								/>
								&emsp;Minor:
								<input
									type="text"
									name="minor"
									size="8"
									value={this.state.minor}
									onChange={e => {
										this.setState({
											minor: e.target.value
										});
									}}
								/>
								<br />
								&ensp;UUID:
								<input
									type="text"
									name="uuid"
									size="28"
									value={this.state.uuid}
									onChange={e => {
										this.setState({
											uuid: e.target.value
										});
									}}
								/>
								<br />
								&ensp;txPower:
								<input
									type="text"
									name="tx"
									size="25"
									value={this.state.tx}
									onChange={e => {
										this.setState({
											tx: e.target.value
										});
									}}
								/>
								<br />
								<button
									className="btn btn-success btn-sm m-2"
									onClick={this.getPinData}
								>
									Add
								</button>
							</div>
							<div className="card" style={{ height: "100" }}>
								<p>
									Name: {this.state.hovered["name"]}
									<br />
									x: {this.state.hovered["x"]}
									<br />
									y: {this.state.hovered["y"]}
									<br />
									UUID: {this.state.hovered["uuid"]}
									<br />
									Major: {this.state.hovered["major"]}
									<br />
									Minor: {this.state.hovered["minor"]}
									<br />
									txPower: {this.state.hovered["tx"]}
								</p>
							</div>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default Beacons;
