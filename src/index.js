// @flow

import { AdapterInterface } from './adapter/interface';

var
  Component: Function,
  Directive: Function,
  Inject: Function,
  Injectable: Function,
  Input: Function,
  Output: Function,
  Pipe: Function;

export function configure(adapater: AdapterInterface) {
  Component = adapater.component();
  Directive = adapater.directive();
  Inject = adapater.inject();
  Injectable = adapater.injectable();
  Input = adapater.input();
  Output = adapater.output();
  Pipe = adapater.pipe();
}

export {
  Component,
  Directive,
  Inject,
  Injectable,
  Input,
  Output,
  Pipe
};
