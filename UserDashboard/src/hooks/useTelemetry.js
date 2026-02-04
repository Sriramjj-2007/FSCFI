import { useEffect, useState } from 'react';

export function useTelemetry(ip) {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Replace with your Pi IP (LAN IP if local)
    const ws = new WebSocket(ip);

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);

    ws.onmessage = (event) => setData(JSON.parse(event.data));

    return () => ws.close();
  }, []);

  return { data, connected };
}
