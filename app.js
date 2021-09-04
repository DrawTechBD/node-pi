const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
let http = require('http');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const exphbs = require('express-handlebars');


const AppError = require('./src/api/error/appError');
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
        this.url = "";
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
        /**
         * pug
         */
        // this.app.engine('handlebars', exphbs());
        // this.app.set('view engine', 'handlebars');

        /**
         * React
         */
        // const options = {beautify: true};
        // this.app.set('views', __dirname + '/views');
        // this.app.set('view engine', 'jsx');
        // this.app.engine('jsx', require('express-react-views').createEngine(options));
    }

    routes() {
        // this.app.get('/', (req, res) => {
        //     return res.render('home');
        // });
        // this.app.get('/view/password-reset', (req, res) => {
        //     res.render('password-reset', {...req.params});
        // });
        // this.app.get('/view/password-reset', (req, res) => {
        //     return res.render('password-reset', {url: process.env.CLIENT_URL, ...req.params});
        // })
        this.app.use('/auth', AuthRoutes);
        this.app.use('/api/user', UserRoutes);
        this.app.use('/api/chatroom', ChatroomRoutes);
        this.app.use('/api/chat', ChatRoutes);
        this.app.use('/api/qr', QRRoutes);
        this.app.use('/api/rota', RotaRoutes);
        this.app.use(AppError.middleware);


        // 404 error handling
        this.app.all("*", (req, res, next) => {
            next(new AppError(`Can't find ${req.originalUrl} on this server~`, 404));
        });

        // Error middleware
        // this.app.use((err, req, res, next) => {
        //     err.statusCode = err.statusCode || 500;
        //     err.status = err.status || 'error';
        //
        //     res.status(err.statusCode).json({
        //         status: err.status,
        //         message: err.message
        //     });
        // });

    }

    websockets() {
        chatSocket.chatIO(this.io);
        // this.io.on("connection", );
    }

    start() {
        this.server.listen(this.port, "0.0.0.0", () => {
            console.log(`Server started on port ${this.port}`);
            // this.url = "http://"+this.server.address().host+":"+this.server.address().port;
        });
    }
}

module.exports = new App();
