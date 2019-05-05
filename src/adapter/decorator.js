// @flow

import { AdapterInterface } from "./interface";

export class AdapterDecorator implements AdapterInterface {
  module(): Function {
    return (): Function => {
      return (target: Function): any => {
        return adapter.module(target);
      };
    };
  }

  // TODO: prefixen der Components einplanen
  component(): Function {
    return (declaration: ComponentDeclarationType): Function => {
      return (target: Function): any => {
        return adapter.component(target, declaration);
      };
    };
  }

  directive(): Function {
    return (declaration: DirectiveDeclarationType): Function => {
      return (target: Function): any => {
        return adapter.directive(target, declaration);
      };
    };
  }

  inject(): Function {
    return (identifier: string): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        // eslint-disable-line no-unused-vars
        return adapter.inject(identifier, target, property, descriptor);
      };
    };
  }

  injectable(): Function {
    return (identifier?: string): Function => {
      return (target: Function): any => {
        return adapter.injectable(target, identifier);
      };
    };
  }

  input(): Function {
    return (optional?: boolean = false): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        // eslint-disable-line no-unused-vars
        return adapter.input(target, property, descriptor, optional);
      };
    };
  }

  output(): Function {
    return (optional?: boolean = false): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        // eslint-disable-line no-unused-vars
        return adapter.output(target, property, descriptor, optional);
      };
    };
  }

  pipe(): Function {
    return (declaration: PipeDeclarationType): Function => {
      return (target: Function): any => {
        return adapter.pipe(
          target,
          declaration
        );
      };
    };
  }
}
