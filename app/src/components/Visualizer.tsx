import './Visualizer.css';

import * as Inferno from 'inferno';
const Framework = Inferno;
// import React from 'react';
// const Framework = React;


/*
 * This is example of Inferno functional component
 * Functional components provide great performance but does not have state
 */
interface VisualizerProps {
	value: number;
}
// export function Visualizer(props: VisualizerProps) {
// 	return <div className='visualizer'>{props.value}</div>;
// }
export class Visualizer extends Framework.Component<VisualizerProps> {
	render() {
		return <div className='visualizer'>{this.props.value}</div>;
	}
}
