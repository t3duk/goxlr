const DaemonCommands = require("./goxlr").daemonCommands;
const GoXLRCommands = require("./goxlr").goxlrCommands;

const daemonCommands = new DaemonCommands();
const goxlrCommands = new GoXLRCommands();

(async () => {
  await daemonCommands.openUi();
})();
