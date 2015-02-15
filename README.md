# Qmachine Web Client Config

## Installation

Initially include on your site:
``` HTML
<script src="tcc.js"></script>
```
And build a TCC object

``` javascript
<script type="text/javascript">
	$( document ).ready(function() {
	    TCC.config(
	      param1: value,
	      param2: value,
	      ...
	    );
	});
</script>
```
## start
Description: Starts the process of collaboration

``` javascript
TCC.start();
```
## stop
Description: Stops the collaborative process

``` javascript
TCC.stop();
```
## beforeStart
Description: Perform a function before the collaboration process begins

Value type: ```function```

``` javascript
TCC.config({
  	beforeStart: function() {
  		alert('Process will start');
  	}
});
```
## afterStart
Description: Perform a function after the collaboration process begins

Value type: ```function```

``` javascript
TCC.config({
  	afterStart: function() {
  		alert('Process began');
  	}
});
```

## beforeStop
Description: Perform a function before the collaborative process be stopped

Value type: ```function```

``` javascript
TCC.config({
  	beforeStop: function() {
  		alert('Process will be stopped');
  	}
});
```

## afterStop
Description: Perform a function after the collaborative process be stopped

Value type: ```function```

``` javascript
TCC.config({
  	afterStop: function() {
  		alert('Process stopped');
  	}
});
```
## startIfTime
Description: Set in the days / hours the collaboration process can be started

Value type: ```string```

Input example:

``` javascript
TCC.config({
	//here we defined when the colaboration process will start
	//Mon: all Mon days
	//Thu(8-15): all Thu days, only in interval from 8 A.M. to 15 P.M.
	//Sat: all Sat days, only in 8 A.M.
	//Sun(22-5): all Sun days, only in interval from 22 P.M. to 23:59 P.M. and 00:01 A.M. to 5 P.M.
  	startIfTime: 'Mon, Thu(8-15), Sat(8-8), Sun(22-5)'
});
```
## timeToStart
Description: Set a period of time to wait before starting the process of collaboration

Value type: ```string``` or ```numeric```

Input example:

``` javascript
TCC.config({
	//you can set any formats, here we use the number 2 for example:
	//'2m': whaiting 2 minutes
	//'2s': whaiting 2 seconds
	//'2': whaiting 2 miliseconds
	//2: whaiting 2 miliseconds
  	timeToStart: '2m'
});
```
## notRunDevices
Description: Set in which devices the middleware should not be played

Value type: ```string```

Possible values: `desktop`, `app`, `tablet`, `smartphone`, `feature phone`, `smart-tv`, `robot`, `other non-mobile` and `other mobile`

Input example:

``` javascript
TCC.config({
	notRunDevices: 'tablet, robot, smartphone',
});
```

## startAsMouseIsStationary
Description: It starts when the mouse cursor does not show movement on the accessed page

Value type: ```string``` ou ```numeric```

Input example:

``` javascript
TCC.config({
	//you can set any formats, here we use the number 2 for example:
	//'2m': starts after 2 minutes of no mouse
	//'2s': starts after 2 seconds of no mouse
	//'2': starts after 2 miliseconds of no mouse
	//2: starts after 2 miliseconds of no mouse
	startAsMouseIsStationary: '2m',
});

```
## loseFocus
Description: It starts when the user is not on the active tab page (is minimized or viewed another browser tab)

Value type: ```boolean```

Input example:

``` javascript
TCC.config({
	loseFocus: true,
});
```

## autoStart
Description: Sets the middleware will start automatically after the page loading

Value type: ```boolean```

Input example:

``` javascript
TCC.config({
	autoStart: true,
});
```
## runAfterNothingToDoMessage
Description: Perform a function after not find any job to be processed

Value type: ```function```

``` javascript
TCC.config({
  	runAfterNothingToDoMessage: function() {
  		alert('Nothing to do');
  	}
});
```
## runAfterTaskDone
Description: Perform a function after you have processed a task

Value type: ```function```

``` javascript
TCC.config({
  	runAfterTaskDone: function(job_key) {
  		alert('Task: ' + job_key + ' is done!');
  	}
});
```
## waitAfterProcessingTasks
Description: Set a period of time that must wait after X process tasks for the volunteer process to continue

Value type: ```array[numeric, numeric/string]```

Input example:

``` javascript
TCC.config({
	//you can set any formats for time, here we use the number 2 for example:
	//'2m': whaiting 2 minutes
	//'2s': whaiting 2 seconds
	//'2': whaiting 2 miliseconds
	//2: whaiting 2 miliseconds

	//defines a time interval of 2 minutes to each six processed jobs
  	waitAfterProcessingTasks: [6, '2m']
});
```
## allowUserInterface
Description: Set up will be shown to the user a TCC project Manipulation Interface

Value type: ```boolean```

Input example:

``` javascript
TCC.config({
  	allowUserInterface: true
});
```
