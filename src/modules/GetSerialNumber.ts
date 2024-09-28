import { GoXLRStatus } from "../types";
import { GetStatus } from "./GetStatus";

export async function GetSerialNumber(
  address: string,
  port: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const status = await GetStatus(address, port);

      resolve(Object.keys(status.mixers)[0]);
    } catch (error) {
      throw new Error("Failed to get serial number");
    }
  });
}
