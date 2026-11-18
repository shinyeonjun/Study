/* node learn/tools/check_learning_layers.js */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const context = vm.createContext({ window: { BDA: {} } });
for (const file of ["notes.js", "js/map.js"]) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), context);
}
const { BDA_MAP: map, BDA: { G } } = context.window;

function ancestors(id) {
  const seen = new Set();
  function visit(unitId) {
    for (const pre of G.unit(unitId).pre) {
      if (G.skipped(pre) || seen.has(pre)) continue;
      seen.add(pre);
      visit(pre);
    }
  }
  visit(id);
  return seen;
}

function check(ids) {
  const floor = new Map();
  G.layers(ids).forEach((layer, level) => {
    assert.ok(layer.length > 0, "empty floor");
    for (const id of layer) {
      assert.ok(!floor.has(id), id);
      floor.set(id, level);
    }
  });
  assert.equal(floor.size, ids.length);
  for (const id of ids) {
    assert.ok(floor.has(id), id);
    for (const pre of ancestors(id)) {
      if (!floor.has(pre)) continue;
      assert.ok(floor.get(pre) < floor.get(id), `${pre} must be below ${id}`);
    }
  }
}

for (const area of map.areas) {
  check(map.units.filter(u => u.area === area.code && !G.skipped(u.id)).map(u => u.id));
}
for (const route of map.paths) check(G.expand(route.targets));

// OP02 and PY10 need math that LA12 inherits even when its own view hides those subjects.
check(["LA12", "LA01", "LA04"]);
console.log(`${map.areas.length} subjects and ${map.paths.length} paths preserve prerequisite layers`);
