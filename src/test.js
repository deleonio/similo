// @flow

import { ComponentDeclarationType } from './adapter/types';

import {
  AdapterInterface
} from './adapter/interface';
import {
  Adapter
} from './adapter';

export class TestAdapter extends Adapter implements AdapterInterface {

  constructor() {
    super(null);
    this.name = 'Test';
    this.version = '0.0.0';
  }

  component(): Function {
    return (): Function => {
      return () => {
      }
    }
  }

  directive(): Function {
    return (): Function => {
      return () => {
      }
    }
  }

  inject(): Function {
    return (): Function => {
      return () => {
      }
    }
  }

  injectable(): Function {
    return (): Function => {
      return () => {
      }
    }
  }

  input(): Function {
    return (): Function => {
      return () => {
      }
    }
  }

  output(): Function {
    return (): Function => {
      return () => {
      }
    }
  }

  pipe(): Function {
    return (): Function => {
      return () => {
      }
    }
  }

}
