const WebSocket = require("ws");
const chalk = require("chalk");
var socket;
var serial;
var id = 0;

async function init() {
  socket = new WebSocket(`ws://127.0.0.1:14564/api/websocket`);

  await new Promise((resolve, reject) => {
    socket.onopen = function () {
      const data = {
        id: id,
        data: "GetStatus",
      };
      socket.send(JSON.stringify(data));
    };

    socket.onmessage = function (event) {
      id++;
      const data = JSON.parse(event.data);
      if (data.data.Status) {
        serial = Object.keys(data.data.Status.mixers)[0];
        resolve(serial);
      }
    };

    socket.onerror = function (error) {
      console.log(chalk.red("Error - GoXLR Utility has not been found."));
      process.exit(1);
    };
  });
}

async function close() {
  socket.close();
}

class DaemonCommands {
  async openUi() {
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "OpenUi" },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async activate() {
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "Activate" },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async deactivate() {
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "StopDaemon" },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async openPath(path) {
    // Profiles, MicProfiles, Presets, Samples, Icons, Logs,
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { OpenPath: path } },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setLogLevel(level) {
    // Off,Error, Warn, Info, Debug, Trace,
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetLogLevel: level } },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setShowTrayIcon(bool) {
    // true, false
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetShowTrayIcon: bool } },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setTTSEnabled(bool) {
    // true, false
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetTTSEnabled: bool } },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setAutoStartEnabled(bool) {
    // true, false
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetAutoStartEnabled: bool } },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setAllowNetworkAccess(bool) {
    // true, false
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetAllowNetworkAccess: bool } },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async recoverDefaults(pach) {
    // Profiles, MicProfiles, Presets, Samples, Icons, Logs,
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { RecoverDefaults: pach } },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
}

class GoxlrCommands {
  async newMicProfile(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { NewMicProfile: [name] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async saveMicProfile() {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, "SaveMicProfile"] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async saveMicProfileAs(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveMicProfileAs: name }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async newProfile(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { NewProfile: name }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async saveProfile() {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, "SaveProfile"] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async saveProfileAs(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveProfileAs: name }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setActiveEffectPreset(present) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetActiveEffectPreset: present }],
      },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setActiveSamplerBank(bank) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetActiveSamplerBank: bank }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setCoughMuteState(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCoughMuteState: bool }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setFaderMuteState(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFaderMuteState: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setFXEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFXEnabled: [fader, volume] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setHardTuneEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { setHardTuneEnabled: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setMegaphoneEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRobotEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setCoughIsHold(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setCoughMuteFunction(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async loadEffectPreset(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async renameActivePreset(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async saveActivePreset() {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoDelayLeft(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoDelayRight(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoFeedback(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoFeedbackLeft(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoFeedbackRight(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoFeedbackXFBLtoR(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoFeedbackXFBRtoL(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEchoTempo(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setGenderAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setGenderStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setHardTuneAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setHardTuneRate(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setHardTuneSource(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setHardTuneStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setHardTuneWindow(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setMegaphoneAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setMegaphonePostGain(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setMegaphoneStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setPitchAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setPitchCharacter(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setPitchStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbDecay(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbDiffuse(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbEarlyLevel(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbHighColour(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbHighFactor(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbLowColour(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbModDepth(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbModSpeed(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbPreDelay(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbStyle(nane) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setReverbTailLevel(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRobotDryMix(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRobotFreq(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRobotGain(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRobotPulseWidth(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRobotThreshold(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRobotWaveform(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRobotWidth(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setFader(fader, name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setFaderMuteFunction(fader, name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setScribbleIcon(fader, name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setScribbleInvert(fader, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setScribbleNumber(fader, name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setScribbleText(fader, name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSwearButtonVolume(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setDeeser(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setMonitorMix(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSubMixEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSubMixLinked(nane, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSubMixOutputMix(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSubMixVolume(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setVolume(name, value) {
    await init();
    const faderValue = Math.round((volume / 100) * 255);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setButtonColours(name, hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setButtonGroupColours(name, hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setButtonOffStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setButtonGroupOffStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEncoderColour(name, hex, hex2, hex3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setAllFaderColours(hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setAllFaderDisplayStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setFaderColours(name, hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setAnimationMode(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setAnimationMod1(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setAnimationMod2(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setAnimationWaterfall(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async SetFaderDisplayStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async SetSampleColour(name, hex, hex2, hex3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async SetSampleOffStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSimpleColour(name, hex) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setMicrophoneGain(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setMicrophoneType(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setCompressorAttack(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setCompressorMakeupGain(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setCompressorRatio(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setCompressorReleaseTime(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setCompressorThreshold(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEqFreq(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEqGain(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEqMiniFreq(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setEqMiniGain(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setGateActive(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setGateAttack(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setGateAttenuation(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setGateRelease(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setGateThreshold(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setRouter(name, name2, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async addSample(name, name2, name3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async playSampleByIndex(name, name2, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async removeSampleByIndex(name, name2, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSamplerFunction(name, name2, name3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSamplerOrder(name, name2, name3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSampleStartPercent(name, name2, value, value2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSampleStopPercent(name, name2, value, value2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setSamplerPreBufferDuration(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async clearSampleProcessError() {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setMuteHoldDuration(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setVCMuteAlsoMuteCM(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setElementDisplayMode(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async loadMicProfile(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async deleteMicProfile(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async loadProfile(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async deleteProfile(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
  async setShutdownCommands(json) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [fader, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
}
class GeneralCommands {
  async getStatus() {
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: "GetStatus",
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.data.Status) {
          resolve(data.data.Status);
        }
      };
    });
    close();
    return response;
  }
  async ping() {
    await init();
    const flowId = id;
    const data = {
      id: flowId,
      data: "Ping",
    };
    socket.send(JSON.stringify(data));
    const response = await new Promise((resolve, reject) => {
      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.id == flowId) {
          resolve(data);
        } else {
          reject(data);
        }
      };
    });
    close();
    return response;
  }
}

module.exports = {
  GoxlrCommands,
  DaemonCommands,
  GeneralCommands,
};
