import { GetSerialNumber } from "./modules/GetSerialNumber";
import { GetStatus } from "./modules/GetStatus";
import { SetLogLevel } from "./modules/SetLogLevel";
import { GoXLRStatus, LogLevel } from "./types";
export * from "./types";

/**
 * Class representing a GoXLR device.
 */
export default class GoXLR {
  address: string;
  port: string;
  serialNumber: string;

  /**
   * Creates an instance of GoXLR.
   *
   * @param {string} [address="localhost"] - The IP address of the GoXLR Utility.
   * @param {string} [port="14564"] - The port to communicate with the GoXLR Utility.
   * @param {string} [serialNumber=""] - The serial number of the GoXLR device.
   */
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
   * Retrieves the status of the GoXLR device.
   *
   * @async
   * @returns {Promise<GoXLRStatus>} The current status of the GoXLR device.
   */
  async status(): Promise<GoXLRStatus> {
    return await GetStatus(this.address, this.port);
  }

  /**
   * Sets the log level for the GoXLR device.
   *
   * @async
   * @param {keyof typeof LogLevel} level - The log level to set.
   * @returns {Promise<string>} A message confirming the log level change.
   */
  async setLogLevel(level: keyof typeof LogLevel): Promise<string> {
    return await SetLogLevel(this.address, this.port, level);
  }
}
