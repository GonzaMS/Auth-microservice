import { envs } from "./config/envs";
import { AppRotes } from "./presentation/routes";
import { Server } from "./presentation/server";

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRotes.routes,
  });

  server.start();
}

(async () => {
  main();
})();
