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
      data: { Command: [serial, { SaveMicProfile: [] }] },
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
      data: { Command: [serial, { SaveProfile: [] }] },
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
      data: { Command: [serial, { SetFXEnabled: [bool] }] },
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
      data: { Command: [serial, { setHardTuneEnabled: [bool] }] },
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
      data: { Command: [serial, { SetMegaphoneEnabled: [bool] }] },
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
      data: { Command: [serial, { SetRobotEnabled: [bool] }] },
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
      data: { Command: [serial, { SetCoughIsHold: [bool] }] },
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
      data: { Command: [serial, { SetCoughMuteFunction: [name] }] },
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
      data: { Command: [serial, { LoadEffectPreset: [name] }] },
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
      data: { Command: [serial, { RenameActivePreset: [name] }] },
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
      data: { Command: [serial, { saveActivePreset: [] }] },
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
      data: { Command: [serial, { SetEchoAmount: [value] }] },
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
      data: { Command: [serial, { SetEchoDelayLeft: [value] }] },
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
      data: { Command: [serial, { SetEchoDelayRight: [value] }] },
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
      data: {
        Command: [serial, { SetEchoFeedback: [value] }],
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
  async setEchoFeedbackLeft(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoFeedbackLeft: [value] }] },
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
      data: {
        Command: [serial, { SetEchoFeedbackRight: [value] }],
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
  async setEchoFeedbackXFBLtoR(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetEchoFeedbackXFBLtoR: [value] }],
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
  async setEchoFeedbackXFBRtoL(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetEchoFeedbackXFBRtoL: [value] }],
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
  async setEchoStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoStyle: [name] }] },
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
      data: { Command: [serial, { SetEchoTempo: [value] }] },
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
      data: { Command: [serial, { SetGenderAmount: [value] }] },
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
      data: { Command: [serial, { SetGenderStyle: [name] }] },
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
      data: { Command: [serial, { SetHardTuneAmount: [value] }] },
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
      data: { Command: [serial, { SetHardTuneRate: [value] }] },
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
      data: { Command: [serial, { SetVolume: [name] }] },
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
      data: { Command: [serial, { SetVolume: [name] }] },
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
      data: { Command: [serial, { SetHardTuneWindow: [value] }] },
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
      data: { Command: [serial, { SetMegaphoneAmount: [value] }] },
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
      data: {
        Command: [serial, { SetMegaphonePostGain: [value] }],
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
  async setMegaphoneStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMegaphoneStyle: [name] }] },
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
      data: { Command: [serial, { SetPitchAmount: [value] }] },
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
      data: { Command: [serial, { SetPitchCharacter: [value] }] },
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
      data: { Command: [serial, { SetPitchStyle: [name] }] },
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
      data: { Command: [serial, { SetReverbAmount: [value] }] },
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
      data: { Command: [serial, { SetReverbDecay: [value] }] },
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
      data: { Command: [serial, { SetReverbDiffuse: [value] }] },
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
      data: { Command: [serial, { SetReverbEarlyLevel: [value] }] },
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
      data: { Command: [serial, { SetReverbHighColour: [value] }] },
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
      data: { Command: [serial, { SetReverbHighFactor: [value] }] },
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
      data: { Command: [serial, { SetReverbLowColour: [value] }] },
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
      data: { Command: [serial, { SetReverbModDepth: [value] }] },
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
      data: { Command: [serial, { SetReverbModSpeed: [value] }] },
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
      data: { Command: [serial, { SetReverbPreDelay: [value] }] },
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
      data: { Command: [serial, { SetReverbStyle: [nane] }] },
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
      data: { Command: [serial, { SetReverbTailLevel: [value] }] },
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
      data: { Command: [serial, { SetRobotDryMix: [value] }] },
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
      data: { Command: [serial, { SetRobotFreq: [name, value] }] },
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
      data: { Command: [serial, { SetRobotGain: [name, value] }] },
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
      data: { Command: [serial, { SetRobotPulseWidth: [value] }] },
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
      data: { Command: [serial, { SetRobotThreshold: [value] }] },
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
      data: { Command: [serial, { SetRobotWaveform: [value] }] },
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
      data: { Command: [serial, { SetRobotWidth: [name, value] }] },
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
  async setFader(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFader: [name, name2] }] },
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
  async setFaderMuteFunction(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetFaderMuteFunction: [name, name2] }],
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
  async setScribbleIcon(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleIcon: [name, name2] }] },
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
  async setScribbleInvert(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleInvert: [name, bool] }] },
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
  async setScribbleNumber(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleNumber: [name, name2] }] },
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
  async setScribbleText(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleText: [name, name2] }] },
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
      data: {
        Command: [serial, { SetSwearButtonVolume: [value] }],
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
  async setDeeser(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetDeeser: [value] }] },
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
      data: { Command: [serial, { SetMonitorMix: [name] }] },
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
      data: { Command: [serial, { SetSubMixEnabled: [bool] }] },
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
      data: { Command: [serial, { SetSubMixLinked: [nane, bool] }] },
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
      data: { Command: [serial, { SetSubMixOutputMix: [name, name2] }] },
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
      data: { Command: [serial, { SetSubMixVolume: [name, value] }] },
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
    const faderValue = Math.round((value / 100) * 255);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [name, faderValue] }] },
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
      data: { Command: [serial, { SetButtonColours: [name, hex, hex2] }] },
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
      data: {
        Command: [serial, { SetButtonGroupColours: [name, hex, hex2] }],
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
  async setButtonOffStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetButtonOffStyle: [name, name2] }] },
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
      data: {
        Command: [serial, { setButtonGroupOffStyle: [name, name2] }],
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
  async setEncoderColour(name, hex, hex2, hex3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetEncoderColour: [name, hex, hex2, hex3] }],
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
  async setAllFaderColours(hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAllFaderColours: [hex, hex2] }] },
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
      data: {
        Command: [serial, { SetAllFaderDisplayStyle: [name] }],
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
  async setFaderColours(name, hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFaderColours: [name, hex, hex2] }] },
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
      data: { Command: [serial, { SetAnimationMode: [name] }] },
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
      data: { Command: [serial, { SetAnimationMod1: [value] }] },
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
      data: { Command: [serial, { SetAnimationMod2: [value] }] },
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
      data: {
        Command: [serial, { SetAnimationWaterfall: [name] }],
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
  async SetFaderDisplayStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetFaderDisplayStyle: [name, name2] }],
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
  async setSampleColour(name, hex, hex2, hex3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSampleColour: [name, hex, hex2, hex3] }] },
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
  async setSampleOffStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSampleOffStyle: [name, name2] }] },
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
      data: { Command: [serial, { SetSimpleColour: [name, hex] }] },
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
      data: { Command: [serial, { SetMicrophoneGain: [name, value] }] },
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
      data: { Command: [serial, { SetMicrophoneType: [name] }] },
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
      data: { Command: [serial, { SetCompressorAttack: [value] }] },
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
      data: {
        Command: [serial, { SetCompressorMakeupGain: [value] }],
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
  async setCompressorRatio(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCompressorRatio: [value] }] },
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
      data: {
        Command: [serial, { SetCompressorReleaseTime: [value] }],
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
  async setCompressorThreshold(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetCompressorThreshold: [value] }],
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
  async setEqFreq(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqFreq: [name, bool] }] },
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
      data: { Command: [serial, { SetEqGain: [name, bool] }] },
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
      data: { Command: [serial, { SetEqMiniFreq: [name, bool] }] },
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
      data: { Command: [serial, { SetEqMiniGain: [name, bool] }] },
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
      data: { Command: [serial, { SetGateActive: [bool] }] },
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
      data: { Command: [serial, { SetGateAttack: [value] }] },
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
      data: { Command: [serial, { SetGateAttenuation: [value] }] },
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
      data: { Command: [serial, { SetGateRelease: [value] }] },
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
      data: { Command: [serial, { SetGateThreshold: [value] }] },
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
      data: { Command: [serial, { SetRouter: [name, name2, bool] }] },
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
      data: { Command: [serial, { AddSample: [name, name2, name3] }] },
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
      data: { Command: [serial, { PlaySampleByIndex: [name, name2, value] }] },
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
      data: {
        Command: [serial, { RemoveSampleByIndex: [name, name2, value] }],
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
  async setSamplerFunction(name, name2, name3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSamplerFunction: [name, name2, name3] }] },
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
      data: { Command: [serial, { SetSamplerOrder: [name, name2, name3] }] },
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
      data: {
        Command: [
          serial,
          { SetSampleStartPercent: [name, name2, value, value2] },
        ],
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
  async setSampleStopPercent(name, name2, value, value2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [
          serial,
          { SetSampleStopPercent: [name, name2, value, value2e] },
        ],
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
  async setSamplerPreBufferDuration(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetSamplerPreBufferDuration: [value] }],
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
  async clearSampleProcessError() {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { ClearSampleProcessError: [] }],
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
  async setMuteHoldDuration(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMuteHoldDuration: [value] }] },
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
      data: { Command: [serial, { SetVCMuteAlsoMuteCM: [bool] }] },
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
      data: {
        Command: [serial, { SetElementDisplayMode: [name, name2] }],
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
  async loadMicProfile(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { LoadMicProfile: [name, bool] }] },
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
      data: { Command: [serial, { DeleteMicProfile: [name] }] },
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
      data: { Command: [serial, { LoadProfile: [name, bool] }] },
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
      data: { Command: [serial, { DeleteProfile: [name] }] },
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
      data: { Command: [serial, { SetShutdownCommands: [json] }] },
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
