const showdown = require('showdown');
const fs = require('fs').promises;
const { getArgs } = require('./utilities/cmdParser');
const path = require('path');

const main = async () => {
	const { input, output, title } = getArgs();
	if (!input) {
		throw new Error('Input is not defined!');
	}

	if (!output) {
		throw new Error('Output is not defined!');
	}

	const pageTitle = title ?? 'README';
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
	let preContentReplaced = preContent.toString().replace(/(\${pageTitle_replace})/g, pageTitle);
	preContentReplaced = preContentReplaced.toString().replace(/(\${stylesheet_replace})/g, stylesheet);
	const html = preContentReplaced + converter.makeHtml(text) + postContent;
	converter.setFlavor('github');
	await fs.writeFile(path.resolve(output), html, { flag: 'wx' }).catch(e => {
		throw new Error(`Cannot write to ${path.resolve(output)} ${e}`);
	});

	console.log(`Successfully wrote to ${output}`);
};

main().then();

module.exports = { main };
