import { starttime, stoptime } from './utils/timer';
import { Incrementer } from './components/Incrementer';
import './main.css';

import * as Inferno from 'inferno';
const Framework = Inferno;
const Bootstrap = {
	render: Inferno.render
};

// import React from 'react';
// import ReactDOM from 'react-dom';
// const Framework = React;
// const Bootstrap = {
// 	render: ReactDOM.render
// };

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
							<h1>{`Welcome to Inferno ${Framework.version} ${index}`}</h1>
							<Incrementer name={'Crazy button' + value} />
						</div>
					);
				})}
			</ul>
		);
	}
}

class DummyComponent {
	testProp: number;
}

function InfernoComponent(...args1) {
	return (...args2) => {
		console.log('InfernoComponent', args1, args2);
		const Test = (...args) => {
			console.log(...args);
		};
		Test.prototype = Object.create(Framework.Component.prototype);
		console.log(Test.prototype.constructor);
		Object.defineProperty(Test.prototype, 'constructor', {
			value: Test,
			enumerable: false, // so that it does not appear in 'for in' loop
			writable: true
		});
		console.log(Test.prototype.constructor);
		console.log(new Test({ title: 'Test' }));
	};
}

function InfernoBinding(...args1) {
	return (...args2) => {
		console.log('InfernoBinding', args1, args2);
	};
}

function InfernoMethod(...args1) {
	return (...args2) => {
		console.log('InfernoMethod', args1, args2);
	};
}

class ParentComponent {}

@InfernoComponent({
	delegate: DummyComponent
})
class TestComponent extends ParentComponent {
	constructor(...args) {
		super();
	}

	@InfernoBinding()
	testProp: number = 0;

	@InfernoMethod()
	testMethod() {}

	@InfernoBinding()
	testProp1: number = 0;
}
console.log(new TestComponent());

Bootstrap.render(<MyComponent />, document.getElementById('inferno'));
