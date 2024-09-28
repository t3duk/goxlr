import { GetSerialNumber } from "./modules/GetSerialNumber";
import { GetStatus } from "./modules/GetStatus";
import { GoXLRStatus } from "./types";
export * from "./types";

export default class GoXLR {
  address: string;
  port: string;
  serialNumber: string;

  constructor(address?: string, port?: string, serialNumber?: string) {
    this.address = address || "localhost";
    this.port = port || "14564";
    this.serialNumber = serialNumber || "";
  }

  private async init(): Promise<void> {
    if (this.serialNumber === "") {
      this.serialNumber = await GetSerialNumber(this.address, this.port);
    }
  }

  /**
   * Returns the global current state of the driver
   */
  async status(): Promise<GoXLRStatus> {
    return await GetStatus(this.address, this.port);
  }
}
