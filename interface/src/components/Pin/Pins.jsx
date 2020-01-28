import React, { Component } from "react";
import Pin from "./Pin";

class Pins extends Component {
	render() {
		const { pins, onHover } = this.props;
		console.log(pins);
		return (
			<div>
				{pins.map(pin => (
					<Pin
						x={pin[0]}
						y={pin[1]}
						name={pin[2]}
						pin={pin}
						onHover={onHover}
					/>
				))}
			</div>
		);
	}
}

export default Pins;
