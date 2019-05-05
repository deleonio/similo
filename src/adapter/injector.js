// @flow

export class Injector {
  services: Object = {};

  register(identifier: string, service: Function) {
    if (
      typeof identifier === "string" &&
      this.services.hasOwnProperty(identifier) === false &&
      typeof service === "function"
    ) {
      this.services[identifier] = {
        instance: null,
        object: service
      };
    } else {
      throw new Error(
        `[Similo] The service '${identifier}' could not registered!`
      );
    }
  }

  get(identifier: string): any {
    if (
      typeof identifier === "string" &&
      this.services.hasOwnProperty(identifier) === true &&
      typeof this.services[identifier] === "object" &&
      this.services[identifier] !== null &&
      Array.isArray(this.services[identifier]) === false &&
      typeof this.services[identifier].object === "function"
    ) {
      if (
        this.services[identifier].instance instanceof
          this.services[identifier].object ===
        false
      ) {
        this.services[identifier].instance = new this.services[
          identifier
        ].object();
      }
      return this.services[identifier].instance;
    } else {
      throw new Error(
        `[Similo] The service '${identifier}' is not registered!`
      );
    }
  }
}
