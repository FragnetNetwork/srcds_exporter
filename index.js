import express from 'express';
import { connect } from 'working-rcon';
import module from './modules/index.js';

const app = express();

app.get('/', (req, res) => {
	res.send('use /metrics?ip=&lt;srcds ip&gt;&port=&lt;srcds port&gt;&rconPassword=&lt;rcon password&gt to get data');
});

app.get('/metrics', async (req, res) => {
	const config = {
		ip: req.query.ip,
		port: req.query.port,
		rconPassword: req.query.rconPassword,
	};

	if (
		config.ip == null
		|| config.port == null
		|| config.rconPassword == null
	) {
		res.send('Missing parameter');
		return;
	}

	try {
		const client = await connect(config.ip, config.port, config.rconPassword, 5000);
		const response = await module.request(config, client);
		await module.send(config, response, res);
		await client.disconnect();
	} catch (e) {
		if (e.code === 'EHOSTUNREACH') {
			console.error(`Unreachable host : ${e.address}:${e.port}`);
		} else {
			console.error(e);
		}
		await module.send(config, null, res, true);
	}
});

app.listen(9591);
