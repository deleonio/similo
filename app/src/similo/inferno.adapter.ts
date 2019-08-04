import { AdapterInterface } from "similo/adapter/interface";
import { Adapter } from "similo/adapter";
import * as inferno from "inferno";

export class InfernoAdapter extends Adapter implements AdapterInterface {
	constructor() {
		super(inferno);
		this.name = 'Inferno';
		this.version = inferno.version;
	}
}
