/*
  This is literally all there is to Web Workers. It's not scary.
  It expects an Event object. Inside this object lives a `data`
  property that has stuff we send to it inside.

  We get that property (called a payload), do stuff, and then send a message back.

  OMG MAGIC RITE?
*/

// When he receives a message,
onmessage = event => {
  const startTime = performance.now() // note the start time
  JSON.parse(event.data) // crunch the data
  const endTime = performance.now() // note the end time

  /*
    Send back { startTime: 949.2993930, endTime: 999.939393939 } or something.
    That's literally it. OMG WORKERS WHAT ARE THEY? Well... that's kind of it.
  */
  postMessage({ startTime, endTime })
}
