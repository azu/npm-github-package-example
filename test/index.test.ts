import { hello } from "../src";
import * as assert from "assert";

it("test", () => {
    assert.strictEqual(hello("john"), "Hello, john");
});
