// import external dependencies
import 'jquery';
import Barba from 'barba.js';

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';

/** Populate Router instance with DOM routes */
const initialRoute = new Router({
  // All pages
  common,
});
const routes = new Router({
  // Home page
  home,
});

// Load Events
jQuery(document).ready(() => {
  // loading initial routes
  initialRoute.loadEvents()
  routes.loadEvents()
  
  // initialize Barba.js
  Barba.Pjax.start()
  Barba.Prefetch.init()
  Barba.Dispatcher.on('newPageReady', () => {
    // fire single pages routes
    routes.loadEvents()
  });
});
