const express = require('express');
const next = require('next');
const { DBConnect } = require('./util/DBConnection');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 3044;

const route = require('./router/appRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('dotenv').config()


app.prepare()
    .then(() => {
        const server = express();
        server.use(cors())
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(cookieParser())
        server.use('/image', express.static(__dirname + '/uploads'));
        server.use('/api', route);

        server.all('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(PORT, async (err) => {
            try {
                if (err) throw err;
                await DBConnect()
                if (process.env.NODE_ENV == 'production') {
                    console.log(`Ready on http://62.72.12.160:${PORT}`)
                }
                else {
                    console.log(`Ready on http://localhost:${PORT}`)
                }
            } catch (error) {
                console.log('===ERROR===', error)
            }
        })
    })
    .catch((ex) => {
        process.exit(1)
    })
