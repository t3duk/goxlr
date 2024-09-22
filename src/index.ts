import { GetStatus } from "./modules/GetStatus";
import { GoXLRStatus } from "./types/GoXLRStatus.interface";

export default class GoXLR {
  address: string;
  port: string;

  constructor(address?: string, port?: string) {
    this.address = address || "localhost";
    this.port = port || "14564";
  }

  async status(): Promise<GoXLRStatus> {
    return await GetStatus(this.address, this.port);
  }
}
