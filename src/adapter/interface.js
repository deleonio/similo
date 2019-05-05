// @flow

/**
 * @export
 * @interface AdapterInterface
 */
export interface AdapterInterface {
  component(): Function;
  directive(): Function;
  inject(): Function;
  injectable(): Function;
  input(): Function;
  output(): Function;
  pipe(): Function;
  name: string;
  version: string;
}
