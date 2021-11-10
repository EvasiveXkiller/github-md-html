const showdown = require('showdown');
const fs = require('fs').promises;
const { getArgs } = require('./utilities/cmdParser');
const path = require('path');

const main = async () => {
	const { input, output, title, keywords, description, icon } = getArgs();
	if (!input) {
		throw new Error('Input is not defined!');
	}

	if (!output) {
		throw new Error('Output is not defined!');
	}

	const headerTags = {
		pageTitle: `<title>${title ?? 'README'}</title>`,
		keywords: keywords ? `<meta name="keywords" content='${keywords}'>` : undefined,
		description: description ? `<meta name="keywords" content='${keywords}'>` : undefined,
		icon: icon ? `<link rel="shortcut icon" href=${path.resolve(icon)}>` : undefined,
	};
	const stylesheet = await fs.readFile(__dirname + '/style.css').catch(err => {
		throw err;
	});
	const data = await fs.readFile(path.resolve(input)).catch(err => {
		throw err;
	});
	const text = data.toString();
	const converter = new showdown.Converter({
		ghCompatibleHeaderId: true,
		simpleLineBreaks: true,
		ghMentions: true,
		tables: true,
	});
	const preContent = await fs.readFile(path.join(__dirname, './utilities/precontent.txt')).catch(e => {
		throw e;
	});
	const postContent = await fs.readFile(path.join(__dirname, './utilities/postcontent.txt')).catch(e => {
		throw e;
	});
	const stylesheetInjection = preContent.toString().replace(/(\${stylesheet_replace})/g, stylesheet);
	const tagsInjection = stylesheetInjection.toString().replace(/(\${metaTagsInject})/g, Object.keys(headerTags).map(k => headerTags[k] ?? '').filter(Boolean).join('\n'));
	console.log(tagsInjection);
	const html = `${stylesheetInjection}
	${tagsInjection}
	${converter.makeHtml(text)}
	${postContent}
	`;
	converter.setFlavor('github');
	await fs.writeFile(path.resolve(output), html, { flag: 'wx' }).catch(e => {
		throw new Error(`Cannot write to ${path.resolve(output)} ${e}`);
	});
	console.log(`Successfully wrote to ${output}`);
};

module.exports = { main };
