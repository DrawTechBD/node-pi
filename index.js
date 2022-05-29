const App = require('./app');

App.start();

// process.on('unhandledRejection', err => {
//     console.log(err.name, err.message);
//     console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//     process.exit(1);
// })