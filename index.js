

const sdk = require('matrix-js-sdk');
const { MatrixClient } = sdk;
const NewsAPI = require('newsapi');
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

let newsApi = new NewsAPI(options.newsApiKey);

newsApi.articles({
  source: 'bbc-news',
  sortBy: 'top',
}).then(articlesResponse => {
	const news = articlesResponse.articles.map((apiArticle) => {
		return {
			title: apiArticle.title,
			body: apiArticle.description,
			image: apiArticle.urlToImage,
			local: false,
		};
	});
	startSendingNews(news);
});

const startSendingNews = (news) => {
	let i = 0;

	const sendNews = () => {
		console.info('Sending news item', i, ':', news[i].title);
		client.sendEvent(options.roomId, options.newsType, news[i]);
		i = (i + 1) % news.length;
	};

	sendNews();
	setInterval(sendNews, options.newsIntervalMs);
}


