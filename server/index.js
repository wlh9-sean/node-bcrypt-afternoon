require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const cors = require('cors')

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env
const authCtrl = require('./../controllers/authCtrl')
const treasureCtrl = require('./../controllers/treasureCtrl')
const auth = require('./middleware/authMiddleware')

const app = express()


app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    }
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database Connected')
}).catch(error => console.log(error))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)

app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))