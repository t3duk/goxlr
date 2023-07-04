# GoXLR JS

![npm](https://img.shields.io/npm/v/goxlr?label=version)
![GitHub Repo stars](https://img.shields.io/github/stars/teddybrine/goxlr)
![GitHub issues](https://img.shields.io/github/issues/teddybrine/goxlr)
![Discord](https://img.shields.io/discord/1124010710138106017?logo=discord&logoColor=5865F2&label=Discord&color=5865F2)

Really quite simple javascript wrapper for using the GoXLR Utility API.

# Install

`npm i goxlr@latest`

# Usage

Refer to the [documentation](https://github.com/teddybrine/goxlr-js/wiki)

# Example

```js
const { GeneralCommands, DaemonCommands, GoxlrCommands } = require("goxlr");

const generalCommands = new GeneralCommands();
const daemonCommands = new DaemonCommands();
const goxlrCommands = new GoxlrCommands();

(async () => {
  goxlrCommands.setVolume("Mic", 100);
})();
```

# Disclaimer

This project is also not supported by, or affiliated in any way with, TC-Helicon. For the official GoXLR software, please refer to their website.

In addition, this project accepts no responsibility or liability for use of this software, or any problems which may occur from its use. Please read the LICENSE for more information.
