
/**
 * NodeJS External Modules
 */
import express from "express";
// import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv';
// let keys: any = require(`./config/keys_${process.env.APP_ENV || 'local'}`);

/**
 * App Variables
 */

dotenv.config({
	path: '.env',
});

const api = require("./routes/api");

const PORT = 8000;
const app = express();
// const db = keys.mongoURI;

/**
 *  App Configuration
 */

// @regex for a URL that only have 1 slash ^/([^/]+)/?$
// @regex for not containing api string and only have 1 slash ^/((?!api).)*([^/]+)/?$
// @regex for not containing api string  ^/((?!api).)*$
// @regex for not starts with api  ^/(?!api).*$

app.get(/\.(js|css|map|ico)$/, express.static(path.resolve(__dirname, '..', 'build')));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use((req, res, next) => {
	/*const allowedOrigins = [
		'http://127.0.0.1:3000',
		'http://localhost:8000',
	];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}*/
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header('Access-Control-Allow-Credentials', "true");
	next();
});

app.use(express.json()); // supaya bisa kirim POST dengan JSON body
app.use('^/api', api);


app.use('^/([^/]+)/?$', (req, res, next) => {

	console.log("react refresh");
	if (req.originalUrl.match('^/api(.*)$')) {
		next();
	} else {
		fs.readFile(path.resolve("./build/index.html"), 'utf-8', (err, data) => {
			if (err) {
				console.log(err);
				return res.status(500).send('error test - some error happened');
			}

			return res.send(data.replace(
				'<div id="root"></div>',
				'<div id="root">${ReactDOMServer.renderToString(<App />)}</div>'
			));
		});
	}
});

// mongoose
// 	.connect(db, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => console.log('MongoDB Connected......'))
// 	.catch(err => console.log("error connect mongo: ", err));

/**
 * Routes Definitions
 */


app.use('^*$', (req, res: any) => {
	res.status(404).json({ message: 'Page Not Found!' });
	return;
});

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log('app launched at PORT: ' + PORT);
});