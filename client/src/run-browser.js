import run from '@cycle/rxjs-run'
import storageDriver from '@cycle/storage'
import { makeHTTPDriver } from '@cycle/http'
import { makeDOMDriver } from '@cycle/dom'
import { makeHistoryDriver, captureClicks } from '@cycle/history'
import makeRouteDriver from './driver/route'
import makeSearchDriver from './driver/search'
import makeScanDriver from './driver/instascan'

import { Observable as O } from './rxjs'

import main from './app'

const apiBase = (process.env.API_URL || '/api').replace(/\/+$/, '')
  , webBase = process.env.BASE_HREF || '/'
  , initTitle = process.browser ? document.title : process.env.SITE_TITLE

const titleDriver = title$ => O.from(title$)
  .subscribe(title => {
    document.title = title ? `${title}` : initTitle;
    document.querySelector('meta[property="og:title"]').setAttribute("content", title ? `${title}` : initTitle);
  })

const descriptionDriver = description$ => O.from(description$)
  .subscribe(description => {
    if (description) {
      document.querySelector('meta[name="description"]').setAttribute("content", description);
      document.querySelector('meta[name="twitter:description"]').setAttribute("content", description);
    }
  })

const ogTitleDriver = description$ => O.from(description$)
  .subscribe(description => {
    if (description) {
      document.querySelector('meta[name="og:title"]').setAttribute("content", description);
      document.querySelector('meta[name="twitter:title"]').setAttribute("content", description);
    }
  })

const ogDescriptionDriver = description$ => O.from(description$)
  .subscribe(description => {
    if (description) {
      document.querySelector('meta[name="og:description"]').setAttribute("content", description);
    }
  })

const ogUrlDriver = description$ => O.from(description$)
  .subscribe(description => {
    if (description) {
      document.querySelector('meta[property="og:url"]').setAttribute("content", description);
    }
  })

const canLinkDriver = description$ => O.from(description$)
  .subscribe(description => {
    const element = document.querySelector('link[rel="canonical"]');

    if (description && description !== 'none') {
      if (!element) {
        const elementToAdd = document.createElement('link');
        elementToAdd.rel = 'canonical';
        elementToAdd.setAttribute("href", description)
        document.head.appendChild(elementToAdd);
      } else {
        element.setAttribute("href", description);
      }
    } else {
      element.remove()
    }
  })

const blindingDriver = process.env.IS_ELEMENTS
  ? require('./driver/blinding')
  : _ => O.empty()

run(main, {
  DOM: makeDOMDriver('#explorer')
  , HTTP: makeHTTPDriver()
  , route: makeRouteDriver(captureClicks(makeHistoryDriver({ basename: webBase })))
  , storage: storageDriver
  , search: makeSearchDriver(apiBase)
  , title: titleDriver
  , description: descriptionDriver
  , ogTitle: ogTitleDriver
  , ogDescription: ogDescriptionDriver
  , ogUrl: ogUrlDriver
  , canLink: canLinkDriver
  , scanner: makeScanDriver()
  , blinding: blindingDriver
})
