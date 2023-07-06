const WebSocket = require("ws");
var socket = 0;
var serial = 0;
var id = 0;

async function init(bindAddress = "127.0.0.1", port = 14564) {
  await new Promise((resolve, reject) => {
    if (socket != 0) {
      resolve(true);
      return;
    }
    socket = new WebSocket(`ws://${bindAddress}:${port}/api/websocket`);
    socket.onopen = async function () {
      const data = {
        id: id,
        data: "GetStatus",
      };
      await socket.send(JSON.stringify(data));
    };

    socket.onmessage = async function (event) {
      id++;
      const data = JSON.parse(event.data);
      if (data.data.Status) {
        serial = Object.keys(data.data.Status.mixers)[0];
        resolve(serial);
      }
    };

    socket.onerror = async function (error) {
      console.log("Error - GoXLR Utility has not been found.");
      console.error(error);
      process.exit(1);
    };
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

class goxlr {
  constructor(bindAddress, port) {
    this.bindAddress = bindAddress;
    this.port = port;
  }
  async openUi() {
    await init(this.bindAddress, this.port);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "OpenUi" },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async activate() {
    await init(this.bindAddress, this.port);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "Activate" },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async deactivate() {
    await init(this.bindAddress, this.port);
    const flowId = id;
    const data = {
      id: flowId,
      data: { Daemon: "StopDaemon" },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
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
    return data;
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
    return data;
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
    return data;
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
    return data;
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
    return data;
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
    return data;
  }
  async close() {
    if (socket) {
      socket.close();
      return true;
    }
    console.log("Socket not connected");
    return false;
  }
  async getStatus() {
    await init(this.bindAddress, this.port);
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
    return data;
  }
  async ping() {
    await init(this.bindAddress, this.port);
    const flowId = id;
    const data = {
      id: flowId,
      data: "Ping",
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async newMicProfile(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { NewMicProfile: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async saveMicProfile() {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveMicProfile: [] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async saveMicProfileAs(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveMicProfileAs: name }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async newProfile(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { NewProfile: name }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async saveProfile() {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveProfile: [] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async saveProfileAs(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SaveProfileAs: name }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setActiveSamplerBank(bank) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetActiveSamplerBank: bank }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setCoughMuteState(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCoughMuteState: bool }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setFaderMuteState(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFaderMuteState: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setFXEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFXEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setHardTuneEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { setHardTuneEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setMegaphoneEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMegaphoneEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRobotEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setCoughIsHold(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCoughIsHold: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setCoughMuteFunction(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCoughMuteFunction: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async loadEffectPreset(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { LoadEffectPreset: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async renameActivePreset(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { RenameActivePreset: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async saveActivePreset() {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { saveActivePreset: [] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setEchoAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setEchoDelayLeft(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoDelayLeft: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setEchoDelayRight(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoDelayRight: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setEchoFeedbackLeft(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoFeedbackLeft: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
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
    return data;
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
    return data;
  }
  async setEchoStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setEchoTempo(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEchoTempo: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setGenderAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGenderAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setGenderStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGenderStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setHardTuneAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setHardTuneRate(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneRate: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setHardTuneSource(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneSource: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setHardTuneStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setHardTuneWindow(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetHardTuneWindow: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setMegaphoneAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMegaphoneAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setMegaphoneStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMegaphoneStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setPitchAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetPitchAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setPitchCharacter(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetPitchCharacter: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setPitchStyle(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetPitchStyle: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbAmount(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbAmount: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbDecay(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbDecay: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbDiffuse(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbDiffuse: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbEarlyLevel(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbEarlyLevel: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbHighColour(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbHighColour: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbHighFactor(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbHighFactor: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbLowColour(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbLowColour: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbModDepth(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbModDepth: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbModSpeed(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbModSpeed: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbPreDelay(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbPreDelay: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbStyle(nane) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbStyle: [nane] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setReverbTailLevel(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetReverbTailLevel: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRobotDryMix(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotDryMix: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRobotFreq(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotFreq: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRobotGain(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotGain: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRobotPulseWidth(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotPulseWidth: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRobotThreshold(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotThreshold: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRobotWaveform(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotWaveform: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRobotWidth(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRobotWidth: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setFader(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFader: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setScribbleIcon(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleIcon: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setScribbleInvert(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleInvert: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setScribbleNumber(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleNumber: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setScribbleText(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetScribbleText: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setDeeser(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetDeeser: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setMonitorMix(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMonitorMix: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setSubMixEnabled(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSubMixEnabled: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setSubMixLinked(nane, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSubMixLinked: [nane, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setSubMixOutputMix(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSubMixOutputMix: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setSubMixVolume(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSubMixVolume: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setButtonColours(name, hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetButtonColours: [name, hex, hex2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setButtonOffStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetButtonOffStyle: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
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
    return data;
  }
  async setAllFaderColours(hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAllFaderColours: [hex, hex2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setFaderColours(name, hex, hex2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetFaderColours: [name, hex, hex2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setAnimationMode(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAnimationMode: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setAnimationMod1(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAnimationMod1: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setAnimationMod2(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetAnimationMod2: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
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
    return data;
  }
  async setSampleColour(name, hex, hex2, hex3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSampleColour: [name, hex, hex2, hex3] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setSampleOffStyle(name, name2) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSampleOffStyle: [name, name2] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setSimpleColour(name, hex) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSimpleColour: [name, hex] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setMicrophoneGain(name, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMicrophoneGain: [name, value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setMicrophoneType(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMicrophoneType: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setCompressorAttack(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCompressorAttack: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setCompressorRatio(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetCompressorRatio: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
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
    return data;
  }
  async setEqFreq(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqFreq: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setEqGain(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqGain: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setEqMiniFreq(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqMiniFreq: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setEqMiniGain(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetEqMiniGain: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setGateActive(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateActive: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setGateAttack(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateAttack: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setGateAttenuation(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateAttenuation: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setGateRelease(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateRelease: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setGateThreshold(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetGateThreshold: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setRouter(name, name2, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetRouter: [name, name2, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async addSample(name, name2, name3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { AddSample: [name, name2, name3] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async playSampleByIndex(name, name2, value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { PlaySampleByIndex: [name, name2, value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async setSamplerFunction(name, name2, name3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSamplerFunction: [name, name2, name3] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setSamplerOrder(name, name2, name3) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetSamplerOrder: [name, name2, name3] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
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
    return data;
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
    return data;
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
    return data;
  }
  async setMuteHoldDuration(value) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetMuteHoldDuration: [value] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setVCMuteAlsoMuteCM(bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetVCMuteAlsoMuteCM: [bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
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
    return data;
  }
  async loadMicProfile(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { LoadMicProfile: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async deleteMicProfile(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { DeleteMicProfile: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async loadProfile(name, bool) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { LoadProfile: [name, bool] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async deleteProfile(name) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { DeleteProfile: [name] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
  async setShutdownCommands(json) {
    await init();

    const flowId = id;
    const data = {
      id: flowId,
      data: { Command: [serial, { SetShutdownCommands: [json] }] },
    };
    socket.send(JSON.stringify(data));
    return data;
  }
}

module.exports = {
  goxlr,
};
