import 'zone.js/dist/zone-node';
import * as express from 'express';
import { readFileSync } from 'fs';
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

const { AppServerModuleNgFactory } = require('../dist-server/main.bundle');

enableProdMode();

const app = express();

app.get('/api/book', (req, res) => {
  const books = readFileSync(__dirname + '/books.json', 'utf-8').toString();
  res.json(JSON.parse(books));
});

const indexHtml = readFileSync(
  __dirname + '/../dist/index.html',
  'utf-8',
).toString();
// serve js, css, ico, etc. files required by /../dist/index.html
app.get(
  '*.*',
  express.static(__dirname + '/../dist', {
    maxAge: '1y',
  }),
);
// pre-render the content of the requested route
app.route('*').get((req, res) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    document: indexHtml,
    url: req.url,
  })
    .then(html => {
      res.status(200).send(html);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(9000, () => {
  console.log('Server listening on port 9000!');
});
