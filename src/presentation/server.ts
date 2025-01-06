import express, { Router } from "express";
import path from "path";

interface ServerOptions {
  port: number;
  routes: Router;
  public_path?: string;
}
export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  private serverListener?: any;

  constructor(options: ServerOptions) {
    const { port, routes, public_path = "public" } = options;

    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //* Public folder
    this.app.use(express.static(this.publicPath));

    //* App Routes
    this.app.use(this.routes);

    //* SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../${this.publicPath}/index.html`
      );

      res.sendFile(indexPath);
    });

    //* Server listener
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
