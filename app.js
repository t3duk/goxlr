const { GeneralCommands, DaemonCommands, GoxlrCommands } = require("./goxlr");

const generalCommands = new GeneralCommands();
const daemonCommands = new DaemonCommands();
const goxlrCommands = new GoxlrCommands();

(async () => {
  goxlrCommands.setFaderMuteState("Mic", true);
})();
