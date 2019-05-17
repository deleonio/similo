// @flow

import type { ComponentDeclarationType, DirectiveDeclarationType, PipeDeclarationType } from './adapter/types';
import { AdapterInterface } from './adapter/interface';
import { Adapter } from './adapter';
import { Injector } from './adapter/injector';

// AngularJS-Mocks
function Filter(): Function {
  return () => {};
}
class Http {
  post() {}
}
class RootScope {
  $on() {}
}
class Scope {
  $apply() {}
}
class State {
  go() {}
}
function StateParams(): Object {
  return {};
}

export class VueAdapter extends Adapter implements AdapterInterface {
  components: string[] = [];
  bindings: string[] = [];
  directives: string[] = [];
  injectables: string[] = [];
  injector: any = new Injector();
  pipes: string[] = [];

  constructor(Vue: any) {
    super(Vue);
    this.injector.register('$filter', Filter);
    this.injector.register('$http', Http);
    this.injector.register('$rootScope', RootScope);
    this.injector.register('$scope', Scope);
    this.injector.register('$state', State);
    this.injector.register('$stateParams', StateParams);
    this.name = 'Vue';
    this.version = Vue.version;
  }

  filterDataAndMethods(object: Object, data: Object = {}, methods: Object = {}): Object {
    Object.getOwnPropertyNames(object).forEach((property: string) => {
      if (object.hasOwnProperty(property)) {
        if (typeof object[property] === 'function') {
          if (
            ['constructor', '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__'].indexOf(
              property
            ) === -1
          ) {
            methods[property] = object[property];
          }
        } else if (this.bindings.indexOf(property) === -1) {
          data[property] = object[property];
        }
      }
    });
    if (
      typeof object.__proto__ === 'object' &&
      object.__proto__ !== null &&
      Array.isArray(object.__proto__) === false &&
      typeof object.__proto__.constructor === 'function'
    ) {
      return this.filterDataAndMethods(object.__proto__, data, methods);
    } else {
      return {
        data: data,
        methods: methods
      };
    }
  }

  component(): Function {
    return (declaration: ComponentDeclarationType): Function => {
      return (target: Function): any => {
        this.debug('Component', declaration.selector);
        this.debug('Component', this.bindings);

        let indexOf: number = this.components.indexOf(declaration.selector);
        if (indexOf < 0) {
          this.components.push(declaration.selector);

          if (typeof declaration.template === 'string') {
            declaration.template = declaration.template.replace(/ \[([a-z-]*)\]="/gi, ' v-bind:$1="');
            declaration.template = declaration.template.replace(/ \(([a-z-]*)\)="/gi, ' v-on:$1="');
            declaration.template = declaration.template.replace(/\$ctrl\./g, '');
            declaration.template = declaration.template.replace(/\{\{::/g, '{{');
            declaration.template = declaration.template.replace(/ ng-change="/g, ' v-change="');
            declaration.template = declaration.template.replace(/ ng-class="/g, ' v-bind:class="');
            declaration.template = declaration.template.replace(/ ng-style="/g, ' v-bind:style="');
            declaration.template = declaration.template.replace(/ ng-if="/g, ' v-if="');
            declaration.template = declaration.template.replace(/ ng-model="/g, ' v-model="');
            declaration.template = declaration.template.replace(/ ng-show="/g, ' v-show="');
            declaration.template = declaration.template.replace(/ ng-submit/g, ' @submit.prevent');
            declaration.template = declaration.template.replace(/(<\/?)ng-transclude>/g, '$1slot>');
            // declaration.template = declaration.template.replace(/ ng-/g, ' v-bind:');
            declaration.template = declaration.template.replace(/ui-view/g, 'router-view');
            declaration.template = declaration.template.replace(/ ([a-z-]+)="\{\{([a-z.]+)\}\}"/gi, ' v-bind:$1="$2"');
            declaration.template = declaration.template.replace(/ ([^= ]+)="{{ *([^} ]+) *}}"/g, ' :$1="$2"');
          }
          console.log(declaration.template); // eslint-disable-line no-console

          var component = new target();

          this.debug('Component', component);

          let api = this.filterDataAndMethods(component),
            props = {};

          this.bindings.forEach((binding: string) => {
            if (component.hasOwnProperty(binding)) {
              props[binding] = {
                default(): any {
                  return component[binding];
                }
              };
            }
          });

          this.framework.component(declaration.selector, {
            beforeCreate() {
              if (typeof component.ngOnInit === 'function') {
                component.ngOnInit(this);
              }
            },
            beforeUpdate() {
              if (typeof component.ngOnChanges === 'function') {
                component.ngOnChanges(this);
              }
            },
            data(): Object {
              return api.data;
            },
            methods: api.methods,
            // name: declaration.selector,
            props: props,
            template: declaration.template
          });
        } else {
          this.warn(`Multiple component selector '${declaration.selector}' =/= '${this.components[indexOf]}'.`);
        }

        this.bindings = [];
      };
    };
  }

  directive(): Function {
    return (declaration: DirectiveDeclarationType): Function => {
      return (): any => {
        this.debug('Directive', declaration);
        console.warn('Directive decorator currently not implemented!'); // eslint-disable-line no-console
      };
    };
  }

  inject(): Function {
    return (identifier: string): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        this.debug('Inject', identifier);

        var injector = this.injector;

        descriptor.configurable = false;
        descriptor.enumerable = false;
        descriptor.get = function(): any {
          return injector.get(identifier);
        };
        descriptor.initializer = descriptor.get;
        descriptor.writable = true;

        return descriptor;
      };
    };
  }

  injectable(): Function {
    return (identifier?: string): Function => {
      return (target: Function): any => {
        if (typeof identifier !== 'string' && typeof target === 'function' && typeof target.name === 'string') {
          identifier = target.name;
        }
        if (typeof identifier === 'string') {
          this.injector.register(identifier, target);
        } else {
          throw new Error(`A service has no identifier!`);
        }
      };
    };
  }

  input(): Function {
    return (): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        // eslint-disable-line no-unused-vars

        this.debug('Input', arguments);

        if (typeof property === 'string' && property.length > 0) {
          this.bindings.push(property);
        } else {
          this.warn(`No valid property by @Input().`);
        }

        descriptor.configurable = false;
        descriptor.enumerable = false;
        descriptor.writable = true;

        return descriptor;
      };
    };
  }

  output(): Function {
    return (optional?: boolean = false): Function => {
      return (target: Function, property: any, descriptor: any): any => {
        // eslint-disable-line no-unused-vars

        // this.debug('Output', property);

        if (typeof property === 'string' && property.length > 0) {
          // $$FlowFixIt
          this.bindings[`(${property})`] = '&';
          if (optional === true) {
            // $$FlowFixIt
            this.bindings[`(${property})`] += '?';
          }

          Object.defineProperty(target, `(${property})`, {
            configurable: false,
            enumerable: false,
            writable: true
          });

          descriptor.configurable = false;
          descriptor.enumerable = false;
          descriptor.initializer = function(): any {
            return this[`(${property})`];
          };
          descriptor.writable = false;
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
        console.warn('Pipe decorator currently not implemented!'); // eslint-disable-line no-console
      };
    };
  }
}
