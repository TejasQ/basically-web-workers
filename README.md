# Basically, [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 🤖

This _fairly trivial_ project seeks to be a pleasant welcome for newcomers to the world of Web Workers, showing what they do: in code, and in a demo, as well as highlighting potential use cases and pitfalls. You can either [see it live](https://tejasq.github.io/basically-web-workers) or clone it yourself and open `index.html` in a [http-server](https://github.com/indexzero/http-server) or something similar. Wooooooo!

## The Project

The project is basically a GIF of this boss dropping a mic, that presents two buttons that both do _incredibly expensive_ calculations. One button does it in the browser, blocking the webpage (DOM) and effectively _pausing_ things, leading to jank and unpleasantness. The other button delegates the calculation to a Web Worker, leaving the DOM nice and interactive.

This is literally just meant to be a POC and nothing too serious.
