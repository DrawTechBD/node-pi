const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
let http = require('http');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const db = require('./src/config/db.config');
const auth = require('./src/config/auth.config');
const chatSocket = require('./src/api/chat/chat/chatSocket');

const AuthRoutes = require('./src/api/auth/authRoutes');
const ChatroomRoutes = require('./src/api/chat/chatRoom/chatRoomRoutes');
const ChatRoutes = require('./src/api/chat/chat/chatRoutes');
const QRRoutes = require('./src/api/qr/qrRoutes');
const RotaRoutes = require('./src/api/rota/rotaRoutes');
const UserRoutes = require('./src/api/user/userRoutes');

class App {
    constructor() {
        this.port = process.env.PORT || 5000;
        this.app = express();
        this.server = http.createServer(this.app);
        this.config();
        this.middleware();
        this.routes();
        this.websockets();
    }

    config() {
        dotenv.config();
        db.connect();
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: "*"
            }
        });

        this.app.set('port', this.port);
        auth.config();
    }

    middleware() {
        //middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors({origin: true, credentials: true}));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // this.app.use("/", express.static(__dirname + "/public"));
    }

    routes() {
        this.app.get('/', (req, res) => {
            return res.json("Welcome to Tan API");
        });
        // this.app.get('/', (req, res) => {
        //     console.log("Test");
        //     // console.log(`Here! ${path.join(__dirname, "/public/index.html")}`);
        //     // return res.sendFile(path.join(__dirname, "public/index.html"));
        //     res.sendFile('public/index.html', {root: __dirname});
        // });
        this.app.use('/auth', AuthRoutes);
        this.app.use('/api/user', UserRoutes);
        this.app.use('/api/chatroom', ChatroomRoutes);
        this.app.use('/api/chat', ChatRoutes);
        this.app.use('/api/qr', QRRoutes);
        this.app.use('/api/rota', RotaRoutes);
        // this.app.get("*", (req, res) => {
        //     res.redirect('/');
        // });

    }

    websockets() {
        chatSocket.chatIO(this.io);
        // this.io.on("connection", );
    }

    start() {
        this.server.listen(this.port, "0.0.0.0", () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}

module.exports = new App();
