// @flow
export type ComponentDeclarationType = {
  bindings?: Object,
  controller: Function,
  replace?: boolean,
  selector: string,
  template?: string,
  templateUrl?: string,
  transclude?: boolean
};

export type DirectiveDeclarationType = {
  controller: Function,
  selector: string
};

export type PipeDeclarationType = {
  controller: Function,
  selector: string
};
