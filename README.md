# GoXLR

[![npm](https://img.shields.io/npm/v/goxlr?label=version)](https://npmjs.org/goxlr)
[![GitHub Repo stars](https://img.shields.io/github/stars/teddybrine/goxlr)](https://github.com/t3duk/goxlr)
[![GitHub issues](https://img.shields.io/github/issues/teddybrine/goxlr)](https://github.com/t3duk/goxlr/issues)
[![Discord](https://img.shields.io/discord/1124010710138106017?logo=discord&logoColor=5865F2&label=Discord&color=5865F2)](https://discord.gg/sRUAVXKeyk)
[![npm](https://img.shields.io/npm/dt/goxlr)](https://npmjs.org/goxlr)

GoXLR is a wrapper for [GoXLR Utility](https://github.com/GoXLR-on-Linux/goxlr-utility) API made by the [GoXLR on Linux Organisation](https://github.com/GoXLR-on-Linux) compatible with both JavaScript and TypeScript.

# Install

You can install GoXLR from [npm](https://npmjs.org/goxlr) using your favourite package manager:

- npm: `npm install goxlr@latest`
- yarn: `yarn install goxlr@latest`
- pnpm: `pnpm install goxlr@latest`
- bun: `bun install goxlr@latest`

# Usage

To start, import and create an instance of the GoXLR class in your project:

```ts
import goxlr from "goxlr";

const goxlrInstance = new goxlr();
```

Refer to the [documentation](https://github.com/t3duk/goxlr/wiki) to see the nearly **150** functions you can use.

# Example

```ts
import goxlr from "goxlr";

const goxlrInstance = new goxlr();

// While GoXLR v2 is developed, I won't put an example here due to breaking changes.
```

# Contributing

We are open to people contributing. Please [fork the repo](https://github.com/t3duk/goxlr/fork), make any changes, and [open a pull request](https://github.com/t3duk/goxlr/pulls).

# Bugs / Features

If you would like to suggest a quality of life update, or there is a bug which needs fixing you can [open an issue here](https://github.com/t3duk/goxlr/issues).

# Disclaimer

This project is also not supported by, or affiliated in any way with, [TC-Helicon](https://www.tc-helicon.com/). For the [official GoXLR software](https://www.tc-helicon.com/product.html?modelCode=P0CQK) and [official GoXLR Mini software](https://www.tc-helicon.com/product.html?modelCode=P0DI7), please refer to their [website](https://www.tc-helicon.com/).

In addition, this project accepts no responsibility or liability for use of this software, or any problems which may occur from its use. Please read the [License](https://github.com/t3duk/goxlr/tree/main?tab=License-1-ov-file) and [3rd Party License](<[LICENSE](https://github.com/t3duk/goxlr/tree/main?tab=License-2-ov-file)>) for more information.

GoXLR was created by [Ted](https://t3d.uk). Thank you to [JulanDeAlb](https://github.com/JulanDeAlb) for creating the [JSON Command List](https://github.com/JulanDeAlb/GoXLR-Utility.NET/blob/dev/CommandsInJson.json). Thank you to [Craig McLure](https://github.com/FrostyCoolSlug) for creating the GoXLR Utility alongside the [GoXLR on Linux Organisation](https://github.com/GoXLR-on-Linux).
