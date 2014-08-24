/*
trabalho futuro:

só da play se tiver logado
play se aceitar termos
play baseado em return true de função
BANDA
limite de execução
bateria
por % de processamento
a cada x tarefas espera x segundos
inatividade do mouse
inatividade do teclado
console de logs

ver mais sobre a variavel state (linha 1792)
a função loop da linha 2320 que faz os alert no console, ver depois 

*/




/*
	@access public
	@description blabalbal
	@author Alex Costa
	@example
	@fire metodos que esse metodo chama
	@name beforeStart
	@param
	@return
	@since 2014
*/
/*
@constructs
*/



function QmachineWebClientConfig() {

	var UNEXPECTED_VALUE_PARM = "TCC: Unexpected value for the parameter %X. See the documentation";
	var QMACHINE_IS_MISSING = "Qmachine is missing";
	var WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'Thu', 'fri', 'sat'];
	var times, timeToStart, notRunDevices, deviceInformation, mouseStationaryListener, state;
	 

	//inicializacao
	this.times = [];
	this.timeToStart = 0;
	this.notRunDevices = '';
	this.deviceInformation = null;
	this.mouseStationaryListener = null;
	this.state = false;

}

QmachineWebClientConfig.prototype.config = function(parms) {
	
	
	if (window.hasOwnProperty('QM') === false) {
 		throw QMACHINE_IS_MISSING;
 		return;
    }

	if(parms.beforeStart != null) {
		if (typeof parms.beforeStart == 'function') {
			this.beforeStart = parms.beforeStart;
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "beforeStart");
		}
	}
	if(parms.afterStart != null) {
		if (typeof parms.afterStart == 'function') {
			TCC.afterStart = parms.afterStart;
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "afterStart");
		}
	}
	if(parms.beforeStop != null) {
		if (typeof parms.beforeStop == 'function') { 
			TCC.beforeStop = parms.beforeStop;
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "beforeStop");
		}
	}
	if(parms.afterStop != null) {
		if (typeof parms.afterStop == 'function') { 
			TCC.afterStop = parms.afterStop;
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "afterStop");
		}
	}
	if(parms.startIfTime != null) {
		if (typeof parms.startIfTime == 'string') {
			
			parms.startIfTime.toLowerCase();
			var times = parms.startIfTime.split(',');
			this.times = times;

		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "startIfTime");
		}
	}
	if(parms.notRunDevices != null) {
		if (typeof parms.notRunDevices == 'string') {

			//carrega as informacoes do dispositivo
			this.loadDevideInformation();
			
			parms.notRunDevices.toLowerCase();
			var devices = parms.notRunDevices.split(',');
			this.notRunDevices = devices;

		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "notRunDevices");
		}
	}
	if(parms.timeToStart != null) {
		this.timeToStart = this.stringToTime(parms.timeToStart);
	}
	if(parms.startAsMouseIsStationary != null) {
		
		if(typeof parms.startAsMouseIsStationary == 'object') { 

			var element, time;
			
			if (typeof parms.startAsMouseIsStationary[0] == 'string' && (typeof parms.startAsMouseIsStationary[1] == 'number' || typeof parms.startAsMouseIsStationary[1] == 'string')) {
				element = parms.startAsMouseIsStationary[0];
				time = this.stringToTime(parms.startAsMouseIsStationary[1]);
			} else {
				throw UNEXPECTED_VALUE_PARM.replace("%X", "startAsMouseIsStationary");
			}
		} else if (typeof parms.startAsMouseIsStationary == 'number' || typeof parms.startAsMouseIsStationary == 'string') {
			element = '*';
			time = this.stringToTime(parms.startAsMouseIsStationary);
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "startAsMouseIsStationary");
		}

		this.configMouseStationaryListener(element, time);
	}
	if(parms.loseFocus != null) {
		
		if(typeof parms.loseFocus == 'boolean') {
			if(parms.loseFocus === true) {
				this.configLoseFocus();
			}
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "loseFocus");
		}
	}
	if(parms.autoStart != null) {
		if (typeof parms.autoStart == 'boolean') {
			
			if(parms.autoStart) {
				this.start();
			}

		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "autoStart");
		}
	}
};
/*
	@name beforeStart
	@description Define um evento a ser executado antes de iniciar o processo de colaboração
	@author Alex Costa
	@since 2014-08
	@abstract
	@access public
	@example
		var tcc = new TCC();
	  	tcc.beforeStart = function() {
	  		//code here
	  	}
*/
QmachineWebClientConfig.prototype.beforeStart = function() {
	
};

/*
	@name afterStart
	@description Define um evento a ser executado após iniciar o processo de colaboração
	@author Alex Costa
	@since 2014-08
	@abstract
	@access public
	@example
		var tcc = new TCC();
	  	tcc.afterStart = function() {
	  		//code here
	  	}
*/
QmachineWebClientConfig.prototype.afterStart = function() {
	
};

QmachineWebClientConfig.prototype.start = function() {

	if(TCC.state === false) {
		if(this.verifyTime()) {
			this.beforeStart();
			if(this.verifyDevice()) {
			
				if(this.timeToStart > 0) {
					setTimeout(function() {
						QM.start();
						TCC.state = true;
						TCC.afterStart();
					}, TCC.timeToStart);
				} else {
					QM.start();
					TCC.state = true;
					this.afterStart();
				}
			}
		}
	}
};

/*
	@name beforeStop
	@description Define um evento a ser executado antes de parar o processo de colaboração
	@author Alex Costa
	@since 2014-08
	@abstract
	@access public
	@example
		var tcc = new TCC();
	  	tcc.beforeStop = function() {
	  		//code here
	  	}
*/
QmachineWebClientConfig.prototype.beforeStop = function() {
	
};

/*
	@name afterStop
	@description Define um evento a ser executado após parar o processo de colaboração
	@author Alex Costa
	@since 2014-08
	@abstract
	@access public
	@example
		var tcc = new TCC();
	  	tcc.afterStop = function() {
	  		//code here
	  	}
*/
QmachineWebClientConfig.prototype.afterStop = function() {
	
};

QmachineWebClientConfig.prototype.stop = function() {
	if(TCC.state === true) {
		this.beforeStop();
		QM.stop();
		TCC.state = false;
		this.afterStop();
	}
};

QmachineWebClientConfig.prototype.verifyTime = function() {
	
	var date = new Date();
	var day = date.getDay();
	var hours = date.getHours();

	if(this.times.length > 0) {

		for(var i = 0; i < this.times.length; i++) {
			
			var day_and_hours = this.times[i].split('(');

			//se no replace de Mon(4) tiver mais de 2 informações ({Mon, 4}) gerará erro pois não é esperado
			if(day_and_hours.length > 2) {
				throw UNEXPECTED_VALUE_PARM.replace("%X", "startIfTime");
			}
			
			if(day_and_hours[0] == WEEK_DAYS[day]) {
				//same day

				//if have hours
				if(day_and_hours.length == 2) {
					
					day_and_hours[1] = day_and_hours[1].replace(')', '');
					var hours_of_day = day_and_hours[1].split('-');
					
					hours_of_day[0] = parseInt(hours_of_day[0]);
					hours_of_day[1] = parseInt(hours_of_day[1]);

					if( hours_of_day[0] <= hours_of_day[1] && //if user set ex: (5-10)
						hours >= hours_of_day[0] &&
						hours <= hours_of_day[1]) {
						return true;
					}
					if( hours_of_day[0] > hours_of_day[1] && //if user set ex: (11-5)
						(
							(hours >= hours_of_day[0] && hours >= hours_of_day[1]) ||
							(hours <= hours_of_day[0] && hours <= hours_of_day[1])
						)
					) {
						return true;
					}
					
				} else {
					return true;
				}
				return false;
				
			}
		}
		return false;
	} else {
		return true;
	}
};

QmachineWebClientConfig.prototype.stringToTime = function(time_param) {

	if(typeof time_param == 'string') {

		var unit = time_param.substr(time_param.length - 1, 1);
		if(unit == 's' || unit == 'm') {
			time_param = time_param.replace(unit, '');
		}

		if(unit == 's') {
			time_param = parseInt(time_param) * 1000;
		} else if(unit == 'm') {
			time_param = parseInt(time_param) * 1000 * 1000;
		} else {
			time_param = parseInt(time_param);
		}

	} else {
		time_param = parseInt(time_param);
	}

	return time_param;
};


QmachineWebClientConfig.prototype.loadDevideInformation = function() {

// Copyright 2014 - ScientiaMobile, Inc., Reston, VA
// WURFL Device Detection
// Terms of service:
// http://wurfljs.com

	eval(function(p,a,c,k,e,d){

		e=function(c){
			return c
		};
		if(!''.replace(/^/,String)){
			while(c--){
				d[c]=k[c]||c
			}
			k=[function(e){
				return d[e]
			}];
			e=function(){
				return'\\w+'
			};
			c=1
		};
		while(c--){
			if(k[c]){
				p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])
			}
		}
		return p
	}
	('3 2={"1":0,"4":"5 8 7","6":"9"};',10,10,'false|is_mobile|WURFL|var|complete_device_name|generic|form_factor|browser|web|Desktop'.split('|'),0,{}));
	
	this.deviceInformation = WURFL;
}

//não testado ainda
QmachineWebClientConfig.prototype.verifyDevice = function() {
	for(var cont = 0; cont < this.notRunDevices.length; cont++) {
		if(this.deviceInformation.form_factor.toLowerCase() == this.notRunDevices[cont].toLowerCase()) {
			return false;
		}
	}
	return true;
}

QmachineWebClientConfig.prototype.configMouseStationaryListener = function(element, time) {
	
	$(element).mouseover(function(){
	  	clearTimeout(TCC.mouseStationaryListener);
		TCC.mouseStationaryListener = setTimeout(function(){
			TCC.start();
		}, time);
	});

}

QmachineWebClientConfig.prototype.configLoseFocus = function() {
	$(window).focus(function() {
	    TCC.stop();
	});

	$(window).blur(function() {
	    TCC.start();
	});
}

//define global object
var TCC = new QmachineWebClientConfig();