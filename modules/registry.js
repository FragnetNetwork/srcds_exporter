import prometheus from 'prom-client';

const csgoRegistry = new prometheus.Registry();

export default {
	csgoRegistry,

	setDefaultLabels(ip, port) {
		const defaultLabels = { server: `${ip}:${port}` };
		csgoRegistry.setDefaultLabels(defaultLabels);
	},

	sendMetrics(res) {
		res.end(csgoRegistry.metrics());
	},
};
