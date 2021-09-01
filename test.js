const isUp = require('is-up');
const isReachable = require('is-reachable');


(async () => {
	let isitup = await isReachable('https://google.com');
    console.log(isitup);
    //=> true
})();