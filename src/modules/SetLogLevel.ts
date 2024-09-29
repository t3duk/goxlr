import { GoXLRStatus, LogLevel } from "../types";
import ws from "../lib/ws";

export async function SetLogLevel(
  address: string,
  port: string,
  level: keyof typeof LogLevel
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const data = { Daemon: { SetLogLevel: level } };

    const res = await ws(address, port, data);

    resolve(res.data);
  });
}
