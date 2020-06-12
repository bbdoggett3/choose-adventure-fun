require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./controllers/authController');

const app = express();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 60 * 24 * 14 },
    secret: SESSION_SECRET
}))

//ENDPOINTS
app.post('/auth/login', authCtrl.login)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set("db", db)
    console.log("Datebase is connected")
    app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT} You are a great programmer Ben`))
}).catch(error => console.log(error, "Database is not working..."))