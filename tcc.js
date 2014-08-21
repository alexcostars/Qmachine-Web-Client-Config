/*
trabalho futuro:
por horário
dia da semana
só da play se tiver logado
play automático
play conforme dispositivo
play se aceitar termos
play depois de x segundos
play baseado em return true de função
BANDA
limite de execução
bateria
por % de processamento
a cada x tarefas espera x segundos

console de logs

*/

var UNEXPECTED_VALUE_PARM = "TCC: Unexpected value for the parameter %X. See the documentation";
var WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'Thu', 'fri', 'sat'];

var times = [];

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
function TCC(parms) {

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
}
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
TCC.prototype.beforeStart = function() {
	
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
TCC.prototype.afterStart = function() {
	
};

TCC.prototype.start = function() {
	if(this.verifyTime()) {
		this.beforeStart();
		QM.start();
		this.afterStart();
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
TCC.prototype.beforeStop = function() {
	
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
TCC.prototype.afterStop = function() {
	
};

TCC.prototype.stop = function() {
	this.beforeStop();
	QM.stop();
	this.afterStop();
};

TCC.prototype.verifyTime = function() {
	
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
