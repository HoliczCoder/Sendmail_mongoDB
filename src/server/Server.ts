import * as server from 'http'
const express = require('express')

export default class Server {
    public app: any;
    public port: number;
    public server: any;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.server = server.createServer(this.app);
    }
    static init(port: number) {
        return new Server(port)
    }
    start(callback: (message: string) => void) {
        this.server.listen(this.port, callback);
    }

}