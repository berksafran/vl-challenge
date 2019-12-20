import io from "socket.io-client";

const socket = io.connect("localhost:3010", {
  timeout: 10000,
  forceNew: true
});

export { socket };
