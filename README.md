# Web Client Config

## Instalação

Inicialmente inclua em seu site:
``` HTML
<script src="tcc.js"></script>
```
E construa um objeto do tipo TCC

``` javascript
<script type="text/javascript">
	$( document ).ready(function() {
	    var tcc = new TCC(
	      param1: value,
	      param2: value,
	      ...
	    );
	});
</script>
```
## beforeStart
Descrição: Execute uma função antes do processo de colaboração ser iniciado

Value type: function

``` javascript
tcc = new TCC({
  	beforeStart: function() {
  		alert('Process will start');
  	}
});
```
## afterStart
Descrição: Execute uma função após o processo de colaboração ser iniciado

Value type: function

``` javascript
tcc = new TCC({
  	afterStart: function() {
  		alert('Process began');
  	}
});
```

## beforeStop
Descrição: Execute uma função antes do processo de colaboração ser interrompido

Value type: function

``` javascript
tcc = new TCC({
  	beforeStop: function() {
  		alert('Process will be stopped');
  	}
});
```

## afterStop
Descrição: Execute uma função após do processo de colaboração ser interrompido

Value type: function

``` javascript
tcc = new TCC({
  	afterStop: function() {
  		alert('Process stopped');
  	}
});
```
## startIfTime
Descrição: Defina em que dias/horas o processo de colaboração poderá ser iniciado

Value type: string

Input example:

``` javascript
tcc = new TCC({
	//here we defined when the colaboration process will start
	//Mon: all Mon days
	//Thu(8-15): all Thu days, only in interval from 8 A.M. to 15 P.M.
	//Sat: all Sat days, only in 8 A.M.
	//Sun(22-5): all Sun days, only in interval from 22 P.M. to 23:59 P.M. and 00:01 A.M. to 5 P.M.
  	startIfTime: 'Mon, Thu(8-15), Sat(8-8), Sun(22-5)'
});
```
## timeToStart
Descrição: Defina um período de tempo que deve ser aguardado antes de iniciar o processo de colaboração

Value type: string or numeric

Input example:

``` javascript
tcc = new TCC({
	//you can set any formats, here we use the number 2 for example:
	//'2m': whaiting 2 minutes
	//'2s': whaiting 2 seconds
	//'2': whaiting 2 miliseconds
	//2: whaiting 2 miliseconds
  	timeToStart: '2m'
});
```
## notRunDevices
Descrição: Defina em quais dispositivos o middleware não deverá ser executado

Value type: string

Possible values: desktop, app, tablet, smartphone, feature phone, smart-tv, robot, other non-mobile and other mobile

Input example:

``` javascript
tcc = new TCC({
	notRunDevices: 'tablet, robot, smartphone',
});
```
