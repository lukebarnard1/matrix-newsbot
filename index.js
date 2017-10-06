

const sdk = require('matrix-js-sdk');
const { MatrixClient } = sdk;

const request = require('request');

const matrixOptions = {
	request: request,
};

const options = {
	newsType: 'x.news',
};

try {
	const config = require('./config');
	console.info('Loaded config', config)
	Object.assign(matrixOptions, config.matrix || {});
	Object.assign(options, config.newsbot || {});
} catch (err) {
	console.error('Error with config file: ', err.message);
}

const client = new MatrixClient(matrixOptions);

let i = 0;
const news = [
	{
		"title": "Communication in Refugee Camps Solved",
		"body": "Refugee camps no longer need to rely on external Internet services for internal communications. Matrix.org provides a decentralised alternative to existing messaging systems with the advantage of not being controlled by a single authority. Camp members, aid workers and doctors can collaborate to improve the living conditions through group-chat discussions. News articles, announcements and weather information can now be disseminated to camp members via Riot - the flagship Matrix client - and through the announcement screens placed at information points around the camp.",
	},
];

const sendNews = () => {
	console.info('Sending news item', i, ':', news[i].title);
	client.sendStateEvent(options.roomId, options.newsType, news[i], Date.now());
	i = (i + 1) % news.length;
	client.sendMessage(options.roomId, {"body": "News sent!", "msgtype": "m.text"});
};

setInterval(sendNews, options.newsIntervalMs);
