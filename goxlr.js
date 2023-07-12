const WebSocket = require("ws");
var socket = 0;
var serial = 0;
var id = 0;
var eventQueue = [];
const debug = true;

async function init(bindAddress = "127.0.0.1", port = 14564, userSerial = 0) {
  console.log(bindAddress, port, userSerial);
  await new Promise((resolve, reject) => {
    if (socket != 0) {
      console.log("Socket already initialized.");
      resolve(true);
      return true;
    } else {
      console.log("Initializing socket...");
      socket = new WebSocket(`ws://${bindAddress}:${port}/api/websocket`);
      console.log(`ws://${bindAddress}:${port}/api/websocket`);
      socket.onopen = async function () {
        const data = {
          id: id,
          data: "GetStatus",
        };
        console.log("Socket initialized.");
        await socket.send(JSON.stringify(data));
      };

      socket.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        eventQueue.push(data);
        if (userSerial != 0) {
          if (data.data.Status && data.data.Status.mixers[userSerial]) {
            console.log("User defined serial found.");
            serial = userSerial;
            resolve(serial);
          } else {
            if (data.data.Status && !serial && data.id == id) {
              console.log("No user defined serial found.");
              serial = Object.keys(data.data.Status.mixers)[0];
              resolve(serial);
              id++;
            } else if (data.data.Status && serial && data.id == id) {
              resolve(serial);
            }
          }
        } else {
          if (data.data.Status && !serial && data.id == id) {
            console.log("No user defined serial found.");
            serial = Object.keys(data.data.Status.mixers)[0];
            resolve(serial);
            id++;
          } else if (data.data.Status && serial && data.id == id) {
            resolve(serial);
          }
        }
      };

      socket.onerror = async function (error) {
        console.log("Error - GoXLR Utility has not been found.");
        console.error(error);
        process.exit(1);
      };
    }
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

async function awaitQueueData(flowId) {
  return new Promise((resolve, reject) => {
    var i = 0;
    const interval = setInterval(() => {
      i++;
      const data = eventQueue.find((x) => x.id == flowId);
      if (data) {
        clearInterval(interval);
        eventQueue = eventQueue.filter((x) => x.id != flowId);
        resolve(data);
      }
      if (i > 100) {
        clearInterval(interval);
        reject("Timeout Error");
      }
    }, 100);
  });
}

class goxlr {
  constructor(bindAddress, port, serial) {
    this.bindAddress = bindAddress;
    this.port = port;
    this.serial = serial;
  }
  async openUi() {
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "OpenUi" },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async activate() {
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "Activate" },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async deactivate() {
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "StopDaemon" },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async openPath(path) {
    // Profiles, MicProfiles, Presets, Samples, Icons, Logs,
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { OpenPath: path } },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setLogLevel(level) {
    // Off,Error, Warn, Info, Debug, Trace,
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetLogLevel: level } },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setShowTrayIcon(bool) {
    // true, false
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetShowTrayIcon: bool } },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setTTSEnabled(bool) {
    // true, false
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetTTSEnabled: bool } },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setAutoStartEnabled(bool) {
    // true, false
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetAutoStartEnabled: bool } },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setAllowNetworkAccess(bool) {
    // true, false
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { SetAllowNetworkAccess: bool } },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async recoverDefaults(pach) {
    // Profiles, MicProfiles, Presets, Samples, Icons, Logs,
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: { RecoverDefaults: pach } },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async connect() {
    if (!socket) {
      await init(this.bindAddress, this.port, this.serial);
      return true;
    }
    console.log("Socket already connected");
    return false;
  }
  async close() {
    if (socket) {
      socket.close();
      socket = 0;
      return true;
    }
    console.log("Socket not connected");
    return false;
  }
  async getStatus() {
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: "GetStatus",
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async ping() {
    await init(this.bindAddress, this.port, this.serial);
    const flowId = id;
    const data = {
      id: flowId,
      data: "Ping",
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async newMicProfile(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { NewMicProfile: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async saveMicProfile() {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveMicProfile: [] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async saveMicProfileAs(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveMicProfileAs: name }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async newProfile(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { NewProfile: name }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async saveProfile() {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveProfile: [] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async saveProfileAs(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveProfileAs: name }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setActiveEffectPreset(present) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetActiveEffectPreset: present }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setActiveSamplerBank(bank) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetActiveSamplerBank: bank }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setCoughMuteState(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCoughMuteState: bool }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setFaderMuteState(name, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFaderMuteState: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setFXEnabled(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFXEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setHardTuneEnabled(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { setHardTuneEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setMegaphoneEnabled(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMegaphoneEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRobotEnabled(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setCoughIsHold(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCoughIsHold: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setCoughMuteFunction(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCoughMuteFunction: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async loadEffectPreset(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { LoadEffectPreset: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async renameActivePreset(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { RenameActivePreset: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async saveActivePreset() {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { saveActivePreset: [] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoAmount(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoDelayLeft(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoDelayLeft: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoDelayRight(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoDelayRight: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoFeedback(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetEchoFeedback: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoFeedbackLeft(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoFeedbackLeft: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoFeedbackRight(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetEchoFeedbackRight: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoFeedbackXFBLtoR(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetEchoFeedbackXFBLtoR: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoFeedbackXFBRtoL(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetEchoFeedbackXFBRtoL: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoStyle(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEchoTempo(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoTempo: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setGenderAmount(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGenderAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setGenderStyle(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGenderStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setHardTuneAmount(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setHardTuneRate(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneRate: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setHardTuneSource(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneSource: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setHardTuneStyle(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setHardTuneWindow(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneWindow: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setMegaphoneAmount(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMegaphoneAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setMegaphonePostGain(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetMegaphonePostGain: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setMegaphoneStyle(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMegaphoneStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setPitchAmount(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetPitchAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setPitchCharacter(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetPitchCharacter: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setPitchStyle(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetPitchStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbAmount(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbDecay(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbDecay: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbDiffuse(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbDiffuse: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbEarlyLevel(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbEarlyLevel: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbHighColour(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbHighColour: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbHighFactor(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbHighFactor: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbLowColour(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbLowColour: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbModDepth(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbModDepth: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbModSpeed(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbModSpeed: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbPreDelay(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbPreDelay: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbStyle(nane) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbStyle: [nane] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setReverbTailLevel(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbTailLevel: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRobotDryMix(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotDryMix: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRobotFreq(name, value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotFreq: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRobotGain(name, value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotGain: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRobotPulseWidth(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotPulseWidth: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRobotThreshold(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotThreshold: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRobotWaveform(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotWaveform: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRobotWidth(name, value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotWidth: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setFader(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFader: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setFaderMuteFunction(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetFaderMuteFunction: [name, name2] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setScribbleIcon(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleIcon: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setScribbleInvert(name, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleInvert: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setScribbleNumber(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleNumber: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setScribbleText(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleText: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSwearButtonVolume(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetSwearButtonVolume: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setDeeser(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetDeeser: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setMonitorMix(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMonitorMix: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSubMixEnabled(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSubMixEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSubMixLinked(nane, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSubMixLinked: [nane, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSubMixOutputMix(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSubMixOutputMix: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSubMixVolume(name, value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSubMixVolume: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setVolume(name, value) {
    await init(this.bindAddress, this.port, this.serial);
    const faderValue = Math.round((value / 100) * 255);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVolume: [name, faderValue] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setButtonColours(name, hex, hex2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetButtonColours: [name, hex, hex2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setButtonGroupColours(name, hex, hex2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetButtonGroupColours: [name, hex, hex2] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setButtonOffStyle(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetButtonOffStyle: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setButtonGroupOffStyle(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { setButtonGroupOffStyle: [name, name2] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEncoderColour(name, hex, hex2, hex3) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetEncoderColour: [name, hex, hex2, hex3] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setAllFaderColours(hex, hex2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAllFaderColours: [hex, hex2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setAllFaderDisplayStyle(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetAllFaderDisplayStyle: [name] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setFaderColours(name, hex, hex2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFaderColours: [name, hex, hex2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setAnimationMode(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAnimationMode: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setAnimationMod1(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAnimationMod1: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setAnimationMod2(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAnimationMod2: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setAnimationWaterfall(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetAnimationWaterfall: [name] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async SetFaderDisplayStyle(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetFaderDisplayStyle: [name, name2] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSampleColour(name, hex, hex2, hex3) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSampleColour: [name, hex, hex2, hex3] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSampleOffStyle(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSampleOffStyle: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSimpleColour(name, hex) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSimpleColour: [name, hex] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setMicrophoneGain(name, value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMicrophoneGain: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setMicrophoneType(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMicrophoneType: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setCompressorAttack(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCompressorAttack: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setCompressorMakeupGain(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetCompressorMakeupGain: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setCompressorRatio(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCompressorRatio: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setCompressorReleaseTime(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetCompressorReleaseTime: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setCompressorThreshold(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetCompressorThreshold: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEqFreq(name, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqFreq: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEqGain(name, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqGain: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEqMiniFreq(name, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqMiniFreq: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setEqMiniGain(name, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqMiniGain: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setGateActive(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateActive: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setGateAttack(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateAttack: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setGateAttenuation(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateAttenuation: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setGateRelease(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateRelease: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setGateThreshold(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateThreshold: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setRouter(name, name2, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRouter: [name, name2, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async addSample(name, name2, name3) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { AddSample: [name, name2, name3] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async playSampleByIndex(name, name2, value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { PlaySampleByIndex: [name, name2, value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async removeSampleByIndex(name, name2, value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { RemoveSampleByIndex: [name, name2, value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSamplerFunction(name, name2, name3) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSamplerFunction: [name, name2, name3] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSamplerOrder(name, name2, name3) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSamplerOrder: [name, name2, name3] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSampleStartPercent(name, name2, value, value2) {
    await init(this.bindAddress, this.port, this.serial);

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
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSampleStopPercent(name, name2, value, value2) {
    await init(this.bindAddress, this.port, this.serial);

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
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setSamplerPreBufferDuration(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetSamplerPreBufferDuration: [value] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async clearSampleProcessError() {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { ClearSampleProcessError: [] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setMuteHoldDuration(value) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMuteHoldDuration: [value] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setVCMuteAlsoMuteCM(bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVCMuteAlsoMuteCM: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setElementDisplayMode(name, name2) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: {
        Command: [serial, { SetElementDisplayMode: [name, name2] }],
      },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async loadMicProfile(name, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { LoadMicProfile: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async deleteMicProfile(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { DeleteMicProfile: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async loadProfile(name, bool) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { LoadProfile: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async deleteProfile(name) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { DeleteProfile: [name] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
  async setShutdownCommands(json) {
    await init(this.bindAddress, this.port, this.serial);

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetShutdownCommands: [json] }] },
    };
    socket.send(JSON.stringify(data));
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      if (data.id === flowId) {
        eventQueue.push(data);
        id++;
      }
    };
    const moreData = await awaitQueueData(flowId);
    return moreData;
  }
}

module.exports = {
  goxlr,
};
