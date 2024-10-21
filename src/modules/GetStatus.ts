import { GoXLRStatus } from "../types";
import ws from "../lib/ws";

export async function GetStatus(
  address: string,
  port: string
): Promise<GoXLRStatus> {
  return new Promise(async (resolve, reject) => {
    try {
      const data = "GetStatus";

      const res = await ws(address, port, data);

      resolve(res.data.Status as GoXLRStatus);
    } catch (error) {
      throw new Error("Failed to get status");
    }
  });
}
