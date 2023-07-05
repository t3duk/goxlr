# GoXLR JS

![npm](https://img.shields.io/npm/v/goxlr?label=version)
![GitHub Repo stars](https://img.shields.io/github/stars/teddybrine/goxlr)
![GitHub issues](https://img.shields.io/github/issues/teddybrine/goxlr)
![Discord](https://img.shields.io/discord/1124010710138106017?logo=discord&logoColor=5865F2&label=Discord&color=5865F2)

GoXLR JS is a JavaScript Wrapper for [GoXLR Utility](https://github.com/GoXLR-on-Linux/goxlr-utility) API made by the [GoXLR on Linux Organisation](https://github.com/GoXLR-on-Linux).

# Install

You can install GoXLR JS from [npm](https://npmjs.org/goxlr).

`npm i goxlr@latest`

# Usage

To start, import the classes into your project:

```js
const { GeneralCommands, DaemonCommands, GoxlrCommands } = require("goxlr");

const generalCommands = new GeneralCommands();
const daemonCommands = new DaemonCommands();
const goxlrCommands = new GoxlrCommands();
```

Refer to the [documentation](https://github.com/teddybrine/goxlr-js/wiki) to see the nearly **150** functions you can use.

# Example

```js
const { GeneralCommands, DaemonCommands, GoxlrCommands } = require("goxlr");
const goxlrCommands = new GoxlrCommands();

async function buttonClicked() {
  await goxlrCommands.setVolume("Mic", 100);
  console.log("Button Clicked! Set Mic to 100%.")
}

buttonClicked()
```

# Contributing

We are open to people contributing. Please [fork the repo](https://github.com/teddybrine/goxlr-js/fork), make any changes, and [open a pull request](https://github.com/teddybrine/goxlr-js/pulls).

# Bugs / Features

If you would like to suggest a quality of life update, or there is a bug which needs fixxing you can [open an issue here](https://github.com/teddybrine/goxlr-js/issues).

# Disclaimer

This project is also not supported by, or affiliated in any way with, [TC-Helicon](https://www.tc-helicon.com/). For the [official GoXLR software](https://www.tc-helicon.com/product.html?modelCode=P0CQK) and [official GoXLR Mini software](https://www.tc-helicon.com/product.html?modelCode=P0DI7), please refer to their [website](https://www.tc-helicon.com/).

In addition, this project accepts no responsibility or liability for use of this software, or any problems which may occur from its use. Please read the LICENSE for more information.

GoXLR JS was created by [Ted @ t3d.uk](https://t3d.uk). Thank you to [@JulanDeAlb](https://github.com/JulanDeAlb) for creating the [JSON Command List](https://github.com/JulanDeAlb/GoXLR-Utility.NET/blob/dev/CommandsInJson.json). Thank you to [@FrostyCoolSlug](https://github.com/FrostyCoolSlug) for creating the GoXLR Utility alongside the [GoXLR on Linux Organisation](https://github.com/GoXLR-on-Linux).
