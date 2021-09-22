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
const PortfolioRoutes = require('./src/api/portfolio/portfolioRoutes');

class App {
    constructor() {
        this.port = process.env.PORT || 5000;

        /**
         * initiate express
         * @type {*|Express}
         */
        this.app = express();

        /**
         * create server
         * @type {Server}
         */
        this.server = http.createServer(this.app);

        /**
         * Configure the application
         */
        this.config();

        /**
         * Configure middlewares for the application
         */
        this.middleware();

        /**
         * declare routes
         */
        this.routes();

        /**
         * Configure web sockets
         */

        this.websockets();
    }

    config() {
        /**
         * Making public routes
         */
        // this.app.configure(() => {
        //    this.app.use('/cdn', express.static(__dirname, '/public/image-cdn'));
        //    this.app.use(express.static(__dirname+"/public"))
        // });
        this.app.use('/cdn', express.static(path.join(__dirname, 'public')));

        /**
         * Instantiate dotenv library to read .env values
         */
        dotenv.config();

        /**
         * Connect the application with database
         */
        db.connect();

        /**
         * Configure SocketIO
         * @type {Server|undefined}
         */
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: "*"
            }
        });

        /**
         * Assign Port to the application
         */
        this.app.set('port', this.port);

        /**
         * Initiate authentication
         */
        auth.config();
    }

    middleware() {
        /**
         * Recognise incoming requests as json object
         */
        this.app.use(express.json());

        /**
         *  body parser
         */
        this.app.use(express.urlencoded({extended: false}));

        /**
         * Use compression middleware
         * Compresses response bodies for all request
         */
        this.app.use(compression());

        /**
         * Secure Express app by setting various HTTP headers
         */
        this.app.use(helmet());

        /**
         * Enable cors
         */
        this.app.use(cors({origin: true, credentials: true}));

        /**
         * Initiate passport configuration
         */
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
        /**
         * Authentication Routes
         */
        this.app.use('/auth', AuthRoutes);

        /**
         * User REST API
         */
        this.app.use('/api/user', UserRoutes);

        /**
         * Portfolio REST API
         */
        this.app.use('/api/portfolio', PortfolioRoutes);

        /**
         * QR REST API
         */
        this.app.use('/api/qr', QRRoutes);

        /**
         * ChatRoom REST API
         */
        this.app.use('/api/chatroom', ChatroomRoutes);

        /**
         * Chat REST API
         */
        this.app.use('/api/chat', ChatRoutes);

        /**
         * Error handling middleware
         */
        this.app.use(AppError.middleware);

        // Invalid url error handling
        this.app.all("*", (req, res, next) => {
            next(new AppError(`Can't find ${req.originalUrl} on this server~`, 404));
        });
    }

    websockets() {
        /**
         * Configure SocketIO for Chatting
         */
        chatSocket.chatIO(this.io);
    }

    start() {
        this.server.listen(this.port, "0.0.0.0", () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}

module.exports = new App();
