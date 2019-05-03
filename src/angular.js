// @flow

import type { ComponentDeclarationType } from './adapter/types';

import {
  Component,
  Directive,
  Injectable,
  Inject,
  Input,
  Output,
  Pipe
} from '@angular/core';
import {
  VERSION
} from '@angular/common';
import {
  AdapterInterface
} from './adapter/interface';
import {
  Adapter
} from './adapter';

export class AngularAdapter extends Adapter implements AdapterInterface {

  constructor() {
    super(null);
    this.name = 'Angular';
    this.version = VERSION.full;
  }

  component(): Function {
    return (declaration: ComponentDeclarationType): Function => {

      if (typeof declaration.template === 'string') {
        // declaration.template = declaration.template.replace(/ \[([a-z-]*)\]="/gi, ' v-bind:$1="');
        // declaration.template = declaration.template.replace(/ \(([a-z-]*)\)="/gi, ' v-on:$1="');
        declaration.template = declaration.template.replace(/\$ctrl\./g, '');
        declaration.template = declaration.template.replace(/\{\{::/g, '{{');
        declaration.template = declaration.template.replace(/ ng-change="/g, ' (ngModelChange)="');
        // declaration.template = declaration.template.replace(/ ng-class="/g, ' v-bind:class="');
        // declaration.template = declaration.template.replace(/ ng-style="/g, ' v-bind:style="');
        declaration.template = declaration.template.replace(/ ng-if="/g, ' *ngIf="');
        declaration.template = declaration.template.replace(/ ng-model="/g, ' [(ngModel)]="');
        declaration.template = declaration.template.replace(/ ng-show="/g, ' hidden="!');
        declaration.template = declaration.template.replace(/ ng-submit=/g, ' (ngSubmit)=');
        // declaration.template = declaration.template.replace(/ ng-/g, ' v-bind:');
        declaration.template = declaration.template.replace(/ui-view/g, 'router-outlet');
        // declaration.template = declaration.template.replace(/ ([a-z-]+)="\{\{([a-z.]+)\}\}"/gi, ' v-bind:$1="$2"');
      }
      console.log(declaration.template); // eslint-disable-line no-console

      return (): any => {
        return Component(declaration);
      }
    };
  }

  directive(): Function {
    return Directive;
  }

  inject(): Function {
    return Inject;
  }

  injectable(): Function {
    return Injectable;
  }

  input(): Function {
    return Input;
  }

  output(): Function {
    return Output;
  }

  pipe(): Function {
    return Pipe;
  }

}
