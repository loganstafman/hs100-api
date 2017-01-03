const Hs100Api = require('./index.js');
const client = new Hs100Api.Client();
const plug = client.getPlug({host: '192.168.113.104'});
const checkTime = 30000; //check current every 30 seconds
// turn off when current reaches 1.0 A
// got this recommendation from
// http://hobby16.neowp.fr/2016/12/01/voltage-threshold-on-charge-doctor/
const cutoffCurrent = 1.0;

function startMonitoring() {
	plug.getConsumption().then(function (e) {
		var current = parseFloat(e["get_realtime"]["current"]);
		console.log(current);
		if(current < cutoffCurrent) {
			plug.setPowerState(false);
			return;
		}
		setTimeout(startMonitoring, checkTime);
	}).catch(console.error);
}