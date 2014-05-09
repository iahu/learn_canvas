function daojishi(lastTime) {
	var now = new Date();
	var allSec = (lastTime-now) / 1000;
	var allMin = allSec/60;
	var allHou = allMin/60;
	var allDay = allHou/24;
	//var allMon = allDay/30;
	//var allYea = allMon/365;
	
	day = allDay >>> 0;
	hour = (allSec - day*24*60*60)/60/60 >>> 0;
	minute = (allSec - day*24*60*60 - hour*60*60)/60 >>> 0;
	second = allSec - day*24*60*60 - hour*60*60 - minute*60 >>> 0;

	return {
		day: day,
		hour: hour,
		minute: minute,
		second: second
	};
}