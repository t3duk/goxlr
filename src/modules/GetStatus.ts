import { GoXLRStatus } from "../types/GoXLRStatus";

export async function GetStatus(
  address: string,
  port: string
): Promise<GoXLRStatus> {
  const identifier = Math.floor(Math.random() * 0xffffffff);

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${address}:${port}/api/websocket`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ id: identifier, data: "GetStatus" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.id === identifier) {
        ws.close();
        resolve(data.data);
      }
    };

    ws.onerror = (error) => {
      throw new Error("Failed to connect to GoXLR Utility Websocket API");
    };
  });
}
