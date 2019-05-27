// @flow

import type { ComponentDeclarationType, DirectiveDeclarationType, PipeDeclarationType } from './adapter/types';
import { AdapterInterface } from './adapter/interface';
import { Adapter } from './adapter';

export class AngularJsAdapter extends Adapter implements AdapterInterface {
  components: string[] = [];
  bindings: Object = {};
  directives: string[] = [];
  injectables: string[] = [];
  injects: Object = {};
  pipes: string[] = [];

  constructor(angular: any, name?: string = 'angularjs', dependencies?: Array<string> = []) {
    super(angular.module(name, dependencies));
    this.name = 'AngularJS';
    this.version = angular.version.full;
  }

  getDependencyInjections(target: any): Array<string> {
    if (target === null) {
      return [];
    } else {
      let dependencyInjections: Array<string> = this.getDependencyInjections(target.__proto__);
      if (this.injects.hasOwnProperty(target) && Array.isArray(this.injects[target])) {
        return dependencyInjections.concat(this.injects[target]);
      } else {
        return dependencyInjections;
      }
    }
  }

  compareArrays(a: Array<string>, b: Array<string>): boolean {
    if (Array.isArray(a) === false || Array.isArray(b) === false) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  getDependencyInjectionParams(target: any): Array<string> {
    if (typeof target === 'function') {
      if (target.length > 0) {
        return target
          .toString()
          .replace(/^function [a-z0-9]+\(([a-z0-9 ,$]+)(.*(\r?\n)?)*/i, '$1')
          .split(', ');
      } else {
        return this.getDependencyInjectionParams(target.__proto__);
      }
    } else {
      return [];
    }
  }

  getDependencyInjectionLength(target: any): number {
    if (typeof target === 'function') {
      if (target.length > 0) {
        return target.length;
      } else {
        return this.getDependencyInjectionLength(target.__proto__);
      }
    } else {
      return 0;
    }
  }

  mergeBindings(oldBindings: Object, newBindings: any): Object {
    if (this.isObject(newBindings)) {
      for (let key in newBindings) {
        if (newBindings.hasOwnProperty(key)) {
          oldBindings[key] = newBindings[key];
        }
      }
    }
    return oldBindings;
  }

  toCamelCase(string: string): string {
    return string
      .replace(
        /-(.)/g,
        ($1: string): string => {
          // eslint-disable-line no-useless-escape
          return $1.toUpperCase();
        }
      )
      .replace(/\-/g, '') // eslint-disable-line no-useless-escape
      .replace(
        /^(.)/,
        ($1: string): string => {
          return $1.toLowerCase();
        }
      );
  }

  component(): Function {
    return (declaration: ComponentDeclarationType): Function => {
      return (target: Function): any => {
        // this.debug('Component', declaration.selector);
        // this.debug('Component', this.bindings);
        // this.debug('Component', this.injects);

        let indexOf: number;
        declaration.selector = this.toCamelCase(declaration.selector);
        indexOf = this.components.indexOf(declaration.selector);

        if (indexOf < 0) {
          this.components.push(declaration.selector);

          declaration.bindings = declaration.bindings || {};
          declaration.bindings = this.mergeBindings(declaration.bindings, this.bindings);

          target.$inject = this.getDependencyInjections(target);
          let params = this.getDependencyInjectionParams(target);
          let length = this.getDependencyInjectionLength(target);
          if (length !== target.$inject.length) {
            // eslint-disable-next-line no-console
            console.warn(
              'Dependency-Injection-Length does not match Annotation-Length!',
              target.name,
              length,
              target.$inject,
              target
            );
          }
          if (this.getNodeEnv() === 'Development' && this.compareArrays(target.$inject, params) === false) {
            // eslint-disable-next-line no-console
            console.warn(
              'Dependency-Injection-Order does not match Annotation-Order!',
              target.name,
              target.$inject,
              params
            );
          }

          this.framework.component(declaration.selector, {
            // bindToController: true,
            bindings: declaration.bindings,
            controller: target,
            replace: declaration.replace,
            template: declaration.template,
            templateUrl: declaration.templateUrl,
            transclude: declaration.transclude
          });
        } else {
          this.warn(`Multiple component selector '${declaration.selector}' =/= '${this.components[indexOf]}'.`);
        }

        this.bindings = {};
      };
    };
  }

  directive(): Function {
    return (declaration: DirectiveDeclarationType): Function => {
      return (): any => {
        this.debug('Directive', declaration);
        console.warn('Directive decorator currently not implemented!'); // eslint-disable-line no-console
        this.bindings = {};
      };
    };
  }

  inject(): Function {
    return (identifier: string): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        // this.debug('Inject', identifier);
        if (typeof identifier === 'string' && identifier.length > 0) {
          if (this.injects.hasOwnProperty(target.constructor) === false) {
            this.injects[target.constructor] = [];
          }
          this.injects[target.constructor].push(identifier);
        } else {
          this.warn(`No valid identifier by @Inject().`);
        }
        descriptor.writable = true;
        return descriptor;
      };
    };
  }

  injectable(): Function {
    return (identifier?: string): Function => {
      return (target: Function): any => {
        // this.debug('Injectable', identifier);

        if (typeof target === 'function') {
          if (typeof identifier !== 'string') {
            if (typeof target.name === 'string') {
              identifier = target.name;
            } else {
              identifier = '';
            }
          }

          if (typeof identifier === 'string' && identifier.length > 0) {
            let indexOf: number;
            indexOf = this.injectables.indexOf(identifier);

            if (indexOf < 0) {
              this.injectables.push(identifier);

              target.$inject = this.getDependencyInjections(target);
              let params = this.getDependencyInjectionParams(target);
              let length = this.getDependencyInjectionLength(target);
              if (length !== target.$inject.length) {
                // eslint-disable-next-line no-console
                console.warn(
                  'Dependency-Injection-Length does not match Annotation-Length!',
                  target.name,
                  length,
                  target.$inject,
                  target
                );
              }
              if (this.getNodeEnv() === 'Development' && this.compareArrays(target.$inject, params) === false) {
                // eslint-disable-next-line no-console
                console.warn(
                  'Dependency-Injection-Order does not match Annotation-Order!',
                  target.name,
                  target.$inject,
                  params
                );
              }

              this.framework.service(identifier, target);
            } else {
              this.warn(`Multiple injectable identifier '${identifier}' =/= '${this.injectables[indexOf]}'.`);
            }
          } else {
            throw new Error('Injectable decoration identifier is valid!');
          }
        } else {
          throw new Error('Injectable decoration target is not a function!');
        }

        this.bindings = {};
        // this.injects = [];
      };
    };
  }

  input(): Function {
    return (optional?: boolean = false): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        // this.debug('Input', property);

        if (typeof property === 'string' && property.length > 0) {
          this.bindings[`[${property}]`] = '<';
          if (optional === true) {
            this.bindings[`[${property}]`] += '?';
          }

          Object.defineProperty(target, `[${property}]`, {
            configurable: false,
            enumerable: false,
            get: function(): any {
              return this[`${property}`];
            },
            set: function(value: any) {
              this[`${property}`] = value;
            }
          });

          descriptor.configurable = false;
          descriptor.enumerable = false;
          descriptor.initializer = function(): any {
            return this[`[${property}]`];
          };
          descriptor.writable = true;
        } else {
          this.warn(`No valid property by @Input().`);
        }

        return descriptor;
      };
    };
  }

  output(): Function {
    return (optional?: boolean = false): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        // this.debug('Output', property);

        if (typeof property === 'string' && property.length > 0) {
          this.bindings[`(${property})`] = '&';
          if (optional === true) {
            this.bindings[`(${property})`] += '?';
          }

          Object.defineProperty(target, `(${property})`, {
            configurable: false,
            enumerable: false,
            get: function(): any {
              return this[`${property}`];
            },
            set: function(value: Function) {
              this[`${property}`] = {
                emit: value
              };
            }
          });

          descriptor.configurable = false;
          descriptor.enumerable = false;
          descriptor.initializer = function(): any {
            return this[`(${property})`];
          };
          descriptor.writable = true;
        } else {
          this.warn(`No valid property by @Output().`);
        }
      };
    };
  }

  pipe(): Function {
    return (declaration: PipeDeclarationType): Function => {
      return (): any => {
        this.debug('Pipe', declaration);
        // eslint-disable-next-line no-console
        console.warn('Pipe decorator currently not implemented!');
        this.bindings = {};
      };
    };
  }
}
