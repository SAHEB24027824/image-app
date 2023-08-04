const express = require('express');
const next = require('next');
const {DBConnect} = require('./util/DBConnection');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 8080;

const route = require('./router/appRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()


app.prepare()
    .then(() => {
        const server = express();
        // server.use(cors({credentials:true}))
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({extended:false}));

        server.use('/image',express.static(__dirname+'/uploads'));
        server.use('/api',route);

        server.all('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(PORT, async (err) => {
            if (err) throw err;
            await DBConnect()
            console.log(`Ready on http://localhost:${PORT}`)
        })
    })
    .catch((ex) => {
        process.exit(1)
    })
    