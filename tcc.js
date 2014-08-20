/*
trabalho futuro:
BANDA
limite de execução
bateria
por horário
dia da semana
por % de processamento
a cada x tarefas espera x segundos
só da play se tiver logado
play automático
play conforme dispositivo
play se aceitar termos
play depois de x segundos
play baseado em return true de função
console de logs

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
function TCC(parms) {

	if(parms.beforeStart != null) {
		
		if (typeof parms.beforeStart == 'function') { 
			
		} else {
			
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
	this.beforeStart();
	QM.start();
	this.afterStart();
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
