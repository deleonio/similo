// @flow

import { Adapter } from "../src/adapter";

const assert = require('assert');

describe("Teste Adapter", () => {
  it("laksjdf", () => {
    let adapter: Adapter = new Adapter();
    assert(adapter instanceof Adapter);
  });
});
