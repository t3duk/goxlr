# GoXLR JS

Welcome to the documentation for GoXLR JS. This is a simple javascript wrapper whoch uses the GoXLR Utility API running on your local machine.

## Privacy

It would be against the law for us to collect any data from you, and we don't want to. Therefore, we don't. All data is stored locally, and is not sent anywhere. We don't even have a server to send it to. This means your serial number is safe.

## Standards

GoXLR JS currently uses `127.0.0.1:14564` to find the GoXLR API. This is the default port for the GoXLR API, and is unlikely to change. If it does, this will be updated. If you have changed it yourself, somehow, or would like to use a different IP you will need to wait while we implement this feature.

## Support

If you need any help, join the [Discord Server](https://discord.gg/sRUAVXKeyk) and give me a ping @t3d.uk. I'll be happy to help. If you find a bug, please open an issue on the [GitHub Issues](https://github.com/teddybrine/goxlr-js/issues) page.

## Installation

To install GoXLR JS, simply run `npm i goxlr@latest` in your project directory.

## Initialization

To use all features of GoXLR JS, you will need to initate each class. This is done by using the following code:

```js
const { GeneralCommands, DaemonCommands, GoxlrCommands } = require("./goxlr");

const generalCommands = new GeneralCommands();
const daemonCommands = new DaemonCommands();
const goxlrCommands = new GoxlrCommands();
```

In most cases, you won't need daemonCommands in whatever project your doing, but if you do they are here.

Now, all functions must be ran asynchronously, so you will need to use the `await` keyword. But, JavaScript doesn't allow `async/await` in the top level of non modules. Therefore, to get around this, if you are just trying to run code when the program is ran, you can use the following code:

```js
(async () => {
    // Code here
})();
```