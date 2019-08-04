import { starttime, stoptime } from './utils/timer';
import { Incrementer } from './components/Incrementer.react';
import './main.css';

// import * as Inferno from 'inferno';
// const Framework = Inferno;
// const Bootstrap = {
// 	render: Inferno.render
// };

import React from 'react';
import ReactDOM from 'react-dom';
const Framework = React;
const Bootstrap = {
	render: ReactDOM.render
};

// import { AngularAdapter } from "similo/angular";
// import { AngularJsAdapter } from "similo/angularjs";
// import { InfernoAdapter } from "./similo/inferno.adapter";
// import { VueAdapter } from "similo/vue";
// import * as angularJs from "angular";
// import Vue from "vue";
// import { initDevTools } from 'inferno-devtools';
// initDevTools();

// const angularAdapter = new AngularAdapter();
// console.log(angularAdapter);
// const angularJsAdapter = new AngularJsAdapter(angularJs);
// console.log(angularJsAdapter);
// const infernoAdapter = new InfernoAdapter();
// console.log(infernoAdapter);
// const vueAdapter = new VueAdapter(Vue);
// console.log(vueAdapter);

class MyComponent extends Framework.Component<any, any> {
	constructor(props, context) {
		super(props, context);
		console.log(context);
	}

	componentDidMount() {
		console.log(stoptime() - starttime);
	}

	public render() {
		const elements = new Array(1);
		elements.fill(5);
		return (
			<ul>
				{elements.map((value: string = 'Maus', index: number) => {
					return (
						<div key={index}>
							<h1>{`Welcome to React ${Framework.version} ${index}`}</h1>
							<Incrementer name={'Crazy button' + value} />
						</div>
					);
				})}
			</ul>
		);
	}
}

Bootstrap.render(<MyComponent />, document.getElementById('react'));
