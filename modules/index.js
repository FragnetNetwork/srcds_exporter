import registry from './registry.js';
import game from './game.js';

export default {
	async request(config, client) {

		const infoResponse = await game.requeseInfo(client);
		const statsResponse = await game.requestStats(client);
		const statusResponse = await game.requestStatus(client);
		
		return {
			info: infoResponse,
			stats: statsResponse,
			status: statusResponse,
		};
	},

	async send(config, response, res) {
		game.setStatsMetrics(response ? response.stats : null);
		game.setInfoMetrics(response ? response.info : null);
		game.setStatusMetrics(response ? response.status : null);

		registry.setDefaultLabels(
			config.ip,
			config.port,
		);

		registry.sendMetrics(res);
	},
};
