var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var msec = diff.getMilliseconds()
	var sec = diff.getSeconds()
	var min = diff.getMinutes()
	var hr = diff.getHours()-1
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	}
	document.getElementById("timer").innerHTML = min + ":" + sec + ":" + msec
	timerID = setTimeout("chrono()", 10)
}
function chronoStart(){
	start = new Date()
	chrono()
}
function chronoContinue(){
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
function chronoReset(){
	document.getElementById("timer").innerHTML = "00:00:000"
}
function chronoRestart(){
	document.getElementById("timer").innerHTML = "00:00:000"
	start = new Date()
	chrono()
}
function chronoStop(){
	clearTimeout(timerID)
}
function chronoGetStringTime(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var msec = ("00"+diff.getMilliseconds()).slice(-3)
	var sec = ("0"+diff.getSeconds()).slice(-2)
	var min = ("0"+diff.getMinutes()).slice(-2)
	return min + ":" + sec + ":" + msec
}
function chronoGetTime(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	return diff.getTime()
}
	
