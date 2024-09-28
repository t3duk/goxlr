export default function (
  address: string,
  port: string,
  data: any
): Promise<any> {
  try {
    const identifier = Math.floor(Math.random() * 0xffffffff);

    return new Promise(async (resolve, reject) => {
      const ws = new WebSocket(`ws://${address}:${port}/api/websocket`);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: identifier, data: data }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.id === identifier) {
          ws.close();
          resolve(data);
        }
      };

      ws.onerror = (error) => {
        throw new Error(
          "Failed to communicate with GoXLR Utility Websocket API"
        );
      };
    });
  } catch (error) {
    throw new Error("Failed to communicate with GoXLR Utility Websocket API");
  }
}
