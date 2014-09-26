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
	    TCC.config(
	      param1: value,
	      param2: value,
	      ...
	    );
	});
</script>
```
## start
Descrição: Inicia o processo de colaboração

``` javascript
TCC.start();
```
## stop
Descrição: Interrompe o processo de colaboração

``` javascript
TCC.stop();
```
## beforeStart
Descrição: Execute uma função antes do processo de colaboração ser iniciado

Value type: ```function```

``` javascript
TCC.config({
  	beforeStart: function() {
  		alert('Process will start');
  	}
});
```
## afterStart
Descrição: Execute uma função após o processo de colaboração ser iniciado

Value type: ```function```

``` javascript
TCC.config({
  	afterStart: function() {
  		alert('Process began');
  	}
});
```

## beforeStop
Descrição: Execute uma função antes do processo de colaboração ser interrompido

Value type: ```function```

``` javascript
TCC.config({
  	beforeStop: function() {
  		alert('Process will be stopped');
  	}
});
```

## afterStop
Descrição: Execute uma função após do processo de colaboração ser interrompido

Value type: ```function```

``` javascript
TCC.config({
  	afterStop: function() {
  		alert('Process stopped');
  	}
});
```
## startIfTime
Descrição: Defina em que dias/horas o processo de colaboração poderá ser iniciado

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
Descrição: Defina um período de tempo que deve ser aguardado antes de iniciar o processo de colaboração

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
Descrição: Defina em quais dispositivos o middleware não deverá ser executado

Value type: ```string```

Possible values: `desktop`, `app`, `tablet`, `smartphone`, `feature phone`, `smart-tv`, `robot`, `other non-mobile` and `other mobile`

Input example:

``` javascript
TCC.config({
	notRunDevices: 'tablet, robot, smartphone',
});
```

## startAsMouseIsStationary
Descrição: Iniciará quando o cursor do mouse não apresentar movimento sobre a página acessada

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
Descrição: Iniciará quando o usuário não estiver com a aba da página ativa (estiver minimizada ou visualizado outra aba do browser)

Value type: ```boolean```

Input example:

``` javascript
TCC.config({
	loseFocus: true,
});
```

## autoStart
Descrição: Define que o middleware será iniciado automaticamente após o carregamento da página

Value type: ```boolean```

Input example:

``` javascript
TCC.config({
	autoStart: true,
});
```
## runAfterNothingToDoMessage
Descrição: Execute uma função após não encontrar nenhuma tarefa para ser processada

Value type: ```function```

``` javascript
TCC.config({
  	runAfterNothingToDoMessage: function() {
  		alert('Nothing to do');
  	}
});
```
## runAfterTaskDone
Descrição: Execute uma função após terminar de processar uma tarefa

Value type: ```function```

``` javascript
TCC.config({
  	runAfterTaskDone: function(job_key) {
  		alert('Task: ' + job_key + ' is done!');
  	}
});
```
## timeToStart
Descrição: Defina um período de tempo que deve ser aguardado após processar X tarefas para que o processo voluntário continue

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
