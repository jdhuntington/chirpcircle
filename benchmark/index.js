var benchrest = require('bench-rest');
var chanceReq = require('chance');
var chance = new chanceReq();
var hostname = process.argv[2];

var dataFn = function() {
  var data = {
    chirp: {
      content: chance.sentence(),
      username: chance.name(),
      loc: {
        coordinates: [
          chance.longitude({min: -124.45, max: -120.49}),
          chance.latitude({min: 36.95, max: 48})
        ]
      }
    }
  };

  return data;
};

var getUrl = function() {
  var lng = chance.longitude({min: -124.45, max: -120.49});
  var lat = chance.latitude({min: 36.95, max: 48});
  return 'http://' + hostname + '/chirp-api/getNearbyChirps?lng=' + lng + '&lat=' + lat;
};

var flow = {
  main: [
    { post: 'http://' + hostname + '/chirp-api/addChirp', json: dataFn },
    { get: getUrl }
  ]
};

// if the above flow will be used with the command line runner or
// programmatically from a separate file then export it.
module.exports = flow;

// There are even more flow options like setup and teardown, see detailed usage

var runOptions = {
  limit: 1000,         // concurrent connections
  iterations: 100000,  // number of iterations to perform
  progress: 1000
};
benchrest(flow, runOptions)
  .on('progress', function(statsObj, percent, concurrentCount, ips) {
    console.log({ ips: ips , percent: percent, stats: statsObj, concurrentCount: concurrentCount });
  })
  .on('error', function (err, ctxName) { console.error('Failed in %s with err: ', ctxName, err); })
  .on('end', function (stats, errorCount) {
    console.log('error count: ', errorCount);
    console.log(stats);
  });
