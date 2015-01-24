var startTime = 0;
var start = 0;
var end = 0;
var diff = 0;
var timerID = 0;
function chrono(){
	end = new Date();
	diff = end - start;
	diff = new Date(diff);
	var msec = ("00"+diff.getMilliseconds()).slice(-3);
	var sec = ("0"+diff.getSeconds()).slice(-2);
	var min = ("0"+diff.getMinutes()).slice(-2);
	document.getElementById("timer").innerHTML = min + ":" + sec + ":" + msec;
	timerID = setTimeout("chrono()", 10);
}

function chronoInit(){
	startTime = new Date();
}
function chronoStart(){
	start = new Date();
	chrono();
}
function chronoContinue(){
	start = new Date()-diff;
	start = new Date(start);
	chrono();
}
function chronoReset(){
	document.getElementById("timer").innerHTML = "00:00:000";
}
function chronoRestart(){
	document.getElementById("timer").innerHTML = "00:00:000";
	clearTimeout(timerID);
	start = new Date();
	chrono();
}
function chronoStop(){
	end = new Date();
	clearTimeout(timerID);
	document.getElementById("timer").innerHTML = "";
}

function chronoGetTime(){
	end = new Date();
	diff = end - start;
	diff = new Date(diff);
	return diff.getTime();
}
function chronoGetTotalTime(){
	diff = end - startTime;
	diff = new Date(diff);
	return diff.getTime();
}
	
