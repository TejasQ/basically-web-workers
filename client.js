/*
  So this script basically makes things interactive
  by telling buttons what to do on click and then doing them.
*/

// But first, if there's no Web Worker support in the browser,
if (typeof Worker === "undefined") {
  // YELL.
  alert("This will not work in your browser because it does not support Web Workers. Sorry. :(")
}

// ...anyway,

// Get the buttons from the webpage (aka the DOM).
const runInBrowserButton = document.querySelector(".js-action__run-in-browser")
const runInWorkerButton = document.querySelector(".js-action__run-in-worker")

/*
  Add event listeners.
  `data` is defined globally in data.js

  It's YUGE.

  Basically, when button is "click"ed, () => doWhateverIsHere(withThis)
*/
runInBrowserButton.addEventListener("click", () => runInBrowser(data))
runInWorkerButton.addEventListener("click", () => runInWorker(data))

// Get the result boxes from the DOM.
const resultFromBrowser = document.querySelector(".js-result__browser")
const resultFromWorker = document.querySelector(".js-result__worker")

// This makes a piece of text for us to put in the DOM.
const makeResultString = duration => `<strong>${duration.toFixed(2)}</strong>ms on average.`

// We run calculations a LOT OF TIMES (in this case, 100) to block the DOM real bad to make a point.
const limit = 100

// This executes when you click the "RUN IN BROWSER" button.
function runInBrowser(data, count = 0, durations = []) {
  const startTime = performance.now() // make a note of when we started

  // Parse the data.
  // Imagine this to be something SLLLOOOOOOWWWWWWW.
  JSON.parse(data)

  const endTime = performance.now() // make a note of when we ended
  const duration = endTime - startTime // diff them to figure out how long it took

  /*
    We keep an array of all durations (3rd argument of this function), and keep adding
    to it each time it's called. See line 69.

    To get the average time, reduce each duration to its sum, and divide it by its total length.
  */
  const averageTime = durations.reduce((acc, duration) => acc + duration, 0) / durations.length

  // We update the result in the DOM here.
  resultFromBrowser.innerHTML = makeResultString(averageTime)

  // If the function has been called 1000 times, STAHP! (stop)
  if (count >= limit) return

  /*
    If not, call it again from inside. This is called recursion.
    It can be called a more declarative, functional approach to iteration (loops) because
    it's basically saying: here's _what I want to do_, instead of, here's _how to do it_.
  */
  runInBrowser(data, 1 + count, [...durations, duration])
}

// This executes when you click the "RUN IN WORKER" button.
function runInWorker(data, count = 0, durations = []) {
  /*
    Store an instance of a Worker in the constant `worker`.
    Constant worker? Sounds like me 🙄 anyway,
    these guys are initialized by referencing the .js file they live in.

    If you're using webpack, webpack has a nice `worker-loader` you can use as well.
  */
  const worker = new Worker("worker.js")

  /*
    Basically, you post a message to it, like this.
    This sends an Event object to the worker that looks like:
      Event { blah: something, blah: otherthing, data: "WHAT YOU'RE SENDING" }

    So then, the worker looks in event.data to receive the payload sent from here.
    Now's a good time to take a look at worker.js if you haven't already.
  */
  worker.postMessage(data)

  /*
    The worker talks back! WOOO! When it does, how do we handle what it says?
    This is how. It sends back an event just like the one described on line 86.

    So, we look in event.data and deal with it appropriately.
    In this case, I programmed the worker (see worker.js) to send back an object with
    its start and end times so we can calculate how long things took.

    So, on message,
  */
  worker.onmessage = event => {
    // see i wasnt lying about what it sends back
    const duration = event.data.endTime - event.data.startTime

    // same old drill like runInBrowser()
    const averageTime = durations.reduce((acc, duration) => acc + duration, 0) / durations.length
    resultFromWorker.innerHTML = makeResultString(averageTime)

    // If the function has been called 1000 times, STAHP!
    if (count >= limit) return

    // If not, call it again from inside.
    runInWorker(data, 1 + count, [...durations, duration])
  }
}
