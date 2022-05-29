const mongoose = require('mongoose');
const dotenv = require('dotenv');

class Database {
    constructor() {
        dotenv.config();
        this.database = null;
        if (process.env.NODE_ENV === "production") {
            this.uri = process.env.DB_STRING_PROD || "";
            this.db_server = "production";
        } else {
            this.uri = process.env.DB_STRING || "";
            this.db_server = "development"
        }
        console.log("DB", this.uri);
    }

    db_options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
        poolSize: 50,
        useCreateIndex: true,
        useFindAndModify: false,
    };

    connect() {
        if (this.database) {
            return;
        }
        mongoose.connect(this.uri, this.db_options)
            .then((res) => {
                console.log(`Connected to database in ${this.db_server}`);
            }).catch((error) => {
            console.log("Error connecting to mongodb", error);
        });

        this.database = mongoose.connection;
    }

    async disconnect() {
        if (!this.database) {
            return;
        }
        await mongoose.disconnect();
    }
}

const db = new Database();
module.exports=db;
