export const metaTags = [
	{
		url: 'wiki/test-home',
		tags: [
			{ name: 'title', content: 'Home page wiki ddc' },
			{ name: 'description', content: 'La parte tecnica della wiki dandy corporation' },
		],
	},
	{
		url: 'wiki/layout',
		tags: [
			{ name: 'title', content: 'Stili applicativi' },
			{ name: 'description', content: 'Pagine di layout applicazione' },
		],
	},
	{
		url: 'wiki/commons-pages',
		tags: [
			{ name: 'title', content: 'Pagine di visualizzazione' },
			{ name: 'description', content: 'Pagine di caricamento file e media' },
		],
	},
	{
		url: 'commons/file/:page',
		tags: [
			{ name: 'title', content: 'visualizzazione file' },
			{ name: 'description', content: 'Pagina di visualizzazione di un file' },
		],
	},
];
