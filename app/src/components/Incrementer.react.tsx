import { addOne } from '../utils/math';
import { Visualizer } from './Visualizer.react';

import './Incrementer.scss';

// import * as Inferno from 'inferno';
// const Framework = Inferno;
import React from 'react';
const Framework = React;

interface Props {
	name: string;
}

/*
 * The first interface defines prop shape
 * The second interface defines state shape
 */
export class Incrementer extends Framework.Component<Props, { value: number }> {
	// export class Incrementer extends Component<Props, { value: number }> {
	public state = {
		value: 1
	};

	constructor(props, context) {
		super(props, context);
	}

	public doMath = () => {
		this.setState({
			value: addOne(this.state.value)
		});
	};

	public render() {
		// uncomment: example of type verification
		//
		// this.props.name = 1;
		// this.props.bar = 1;

		const elements = new Array(1);
		elements.fill(5);
		return (
			<ul>
				{elements.map((value, index) => {
					return (
						<div key={index}>
							<h1>{`${value}-${index}`}</h1>
							{this.props.name}
							<button className='my-button' onClick={this.doMath}>
								Increment
							</button>
							<Visualizer value={this.state.value} />
						</div>
					);
				})}
			</ul>
		);
	}
}
