import React, { Component } from "react";

import pin from "assets/img/circle.png";

export class Pin extends Component {
	state = {
		width: 13,
		length: 13
	};

	render() {
		return (
			<img
				onMouseEnter={() => this.setState({ width: 20, length: 20 })}
				onMouseLeave={() => this.setState({ width: 13, length: 13 })}
				onClick={() => this.props.onHover(this.props.pin)}
				src={pin}
				width={this.state.width}
				length={this.state.length}
				style={{
					position: "absolute",
					top: this.props.pin[1],
					left: this.props.pin[0]
				}}
			/>
		);
	}
}

export default Pin;
