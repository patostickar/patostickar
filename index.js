require('isomorphic-unfetch');
const { promises: fs } = require('fs');
const path = require('path');

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), './README.template.md'))
  ).toString('utf-8');

  const quotes = await (await fetch('https://type.fit/api/quotes')).json();

  const id = Math.floor(Math.random() * 1643);
  const quote = quotes[id];

  const readme = readmeTemplate
    .replace('{id}', id)
    .replace('{quote}', quote.text)
    .replace('{character}', quote.author);

  await fs.writeFile('README.md', readme);
}

main();
