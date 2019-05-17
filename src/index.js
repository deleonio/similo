// @flow

import { AdapterInterface } from "./adapter/interface";

var Component: Function,
  Directive: Function,
  Framework: Object = {},
  Inject: Function,
  Injectable: Function,
  Input: Function,
  Output: Function,
  Pipe: Function;

export function configure(adapter: AdapterInterface) {
  Component = adapter.component();
  Directive = adapter.directive();
  Framework.NAME = adapter.name;
  Framework.VERSION = adapter.version;
  Inject = adapter.inject();
  Injectable = adapter.injectable();
  Input = adapter.input();
  Output = adapter.output();
  Pipe = adapter.pipe();
}

export {
  Component,
  Directive,
  Framework,
  Inject,
  Injectable,
  Input,
  Output,
  Pipe
};
