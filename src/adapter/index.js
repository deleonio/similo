// @flow

export class Adapter {
  #framework: any;
  #name: string;
  #version: string;

  constructor(framework: any) {
    this.framework = framework;
  }

  set framework(value: any) {
    this.#framework = value;
  }
  get framework(): any {
    return this.#framework;
  }

  set name(value: string) {
    this.#name = value;
  }
  get name(): string {
    return this.#name;
  }

  set version(value: string) {
    this.#version = value;
  }
  get version(): string {
    return this.#version;
  }

  getNodeEnv(): any {
    if (this.isObject(process) && this.isObject(process.env) && this.isString(process.env.NODE_ENV)) {
      return process.env.NODE_ENV;
    } else {
      return null;
    }
  }

  isString(any: any, minLength?: number = 0): boolean {
    return typeof any === 'string' && any.length >= minLength;
  }

  isArray(any: any): boolean {
    return Array.isArray(any);
  }

  isObject(any: any): boolean {
    return typeof any === 'object' && any !== null && this.isArray(any) === false;
  }

  debug(construct: string, declaration: any) {
    console.log('Adapter', construct, declaration); // eslint-disable-line no-console
  }

  info(message: string) {
    console.info('Adapter', message); // eslint-disable-line no-console
  }

  warn(message: string) {
    console.warn('Adapter', message); // eslint-disable-line no-console
  }
}
