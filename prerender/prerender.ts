import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server';
import { writeFileSync } from 'fs';

const { AppServerModuleNgFactory } = require('../dist-server/main.bundle');

renderModuleFactory(AppServerModuleNgFactory, {
  document: '<app-root></app-root>',
  url: '/books',
})
  .then(html => {
    console.log('Pre-rendering successful, saving prerender.html...');
    writeFileSync(__dirname + '/prerender.html', html);
    console.log('Done');
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
