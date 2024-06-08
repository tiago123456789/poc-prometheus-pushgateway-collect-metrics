const schedule = require('node-schedule');
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({
    register
});


const trackInvocationCronjob = new client.Counter({
    name: 'track_invocation_cronjob',
    help: 'Metric responsable to track how many invocations happened cronjob',
    registers: [register],
    labelNames: ["cronjob_name"]
})

const trackErrorCronjob = new client.Counter({
    name: 'track_error_cronjob',
    help: 'Metric responsable to track how many errors happened cronjob',
    registers: [register],
    labelNames: ["cronjob_name"]
})

const trackTimeExecutionCronjob = new client.Histogram({
    name: 'track_time_execution_cronjob',
    help: 'Metric responsable to track how many time spend to execute cronjob',
    registers: [register],
    labelNames: ["cronjob_name"]
});

const sleep = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, seconds * 1000)
    })
}

// schedule.scheduleJob('*/1 * * * *', function () {
//     try {
//         if (!(Math.floor(Math.random() * 10)  % 2)) {
//             throw new Error("Oops! Some problem happening")
//         }
//         trackInvocationCronjob.inc({
//             cronjob_name: "cronjob1"
//         })
//         console.log("passed on here")
//     } catch(error) {
//         console.log(error)
//         trackErrorCronjob.inc({
//             cronjob_name: "cronjob1"
//         })
//     }
// });



schedule.scheduleJob('*/15 * * * * *', function () {
    try {
        if (!(Math.floor(Math.random() * 10)  % 2)) {
            throw new Error("Oops! Some problem happening")
        }
        trackInvocationCronjob.inc({
            cronjob_name: "cronjob2"
        })
        console.log("passed on here")
    } catch(error) {
        console.log(error)
        trackErrorCronjob.inc({
            cronjob_name: "cronjob2"
        })
    }
});

// schedule.scheduleJob('*/15 * * * * *', async function () {
//     const end = trackTimeExecutionCronjob.startTimer({
//         cronjob_name: "cronjob1"
//     })
//     const seconds = Math.floor(Math.random() * 10) + 6
//     await sleep(seconds)
//     console.log("Finished what was processing")
    
//     end();
//     trackInvocationCronjob.inc({
//         cronjob_name: "cronjob1"
//     })
// });

let gateway = new client.Pushgateway('http://127.0.0.1:9091', {
    requireJobName: false,
}, register);


setInterval(() => {
    gateway.push({
        jobName: "poc-nodejs-using-pushgateway",
    })
        .then(console.log)
        .catch(console.log)
}, 1000)
