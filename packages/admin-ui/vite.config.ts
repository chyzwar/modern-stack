import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  clearScreen: false,
  server: {
    port: 5000,
    host: true,
    hmr: {
      host: "localhost",
      port: 5000,
    },
  },
  plugins: [react()], 

});
