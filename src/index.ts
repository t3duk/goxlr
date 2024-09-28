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

  async status(): Promise<GoXLRStatus> {
    // Init is not called here as it is not needed
    return await GetStatus(this.address, this.port);
  }
}
