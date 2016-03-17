var benchrest = require('bench-rest');
var chanceReq = require('chance');
var chance = new chanceReq();

var dataFn = function() {
  var data = {
    chirp: {
      content: chance.sentence(),
      username: chance.name(),
      loc: [
        chance.latitude({min: 36.95, max: 48}),
        chance.longitude({min: -124.45, max: -120.49})
      ]
    }
  };

  return data;
};

var flow = {
  main: [
    { post: 'http://104.40.13.35/chirp-api/addChirp', json: dataFn },
    //        { get: 'http://localhost:8000/foo_#{INDEX}' }
  ]
};

// if the above flow will be used with the command line runner or
// programmatically from a separate file then export it.
module.exports = flow;

// There are even more flow options like setup and teardown, see detailed usage

var runOptions = {
  limit: 20,     // concurrent connections
  iterations: 10000,  // number of iterations to perform
  progress: 1000
};
benchrest(flow, runOptions)
  .on('progress', function(statsObj, percent, concurrentCount, ips) {
    console.log({ ips: ips , percent: percent });
  })
  .on('error', function (err, ctxName) { console.error('Failed in %s with err: ', ctxName, err); })
  .on('end', function (stats, errorCount) {
    console.log('error count: ', errorCount);
    console.log('stats', stats);
  });
