const WebSocket = require("ws");
const chalk = require("chalk");
var socket;
var serial;

async function init() {
  socket = new WebSocket(`ws://127.0.0.1:14564/api/websocket`);

  await new Promise((resolve, reject) => {
    socket.onopen = function () {
      const data = {
        id: 1,
        data: "GetStatus",
      };
      socket.send(JSON.stringify(data));
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.data.Status) {
        serial = Object.keys(data.data.Status.mixers)[0];
        resolve(serial);
      }
    };

    socket.onclose = function (event) {};

    socket.onerror = function (error) {
      reject(error);
    };
  });
}

async function close() {
  socket.close();
}

class daemonCommands {
  async openUi() {
    await init();
    const data = {
      id: 1,
      data: { Daemon: "OpenUi" },
    };
    socket.send(JSON.stringify(data));
    close();
  }
}

class goxlrCommands {
  async setVolume(fader, volume) {
    await init();
    const faderValue = Math.round((volume / 100) * 255);
    const data = {
      id: 1,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    close();
  }
}

module.exports = {
  goxlrCommands,
  daemonCommands,
};
