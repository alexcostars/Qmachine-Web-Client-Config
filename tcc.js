//- JavaScript source code
//- tcc.js ~~
//  ~~ (c) SRW, Sep 2014
//  ~~ last updated Out 2014

function QmachineWebClientConfig() {

	var UNEXPECTED_VALUE_PARM = "TCC: Unexpected value for the parameter %X. See the documentation";
	var QMACHINE_IS_MISSING = "Qmachine is missing";
	var times, timeToStart, notRunDevices, deviceInformation, mouseStationaryListener, state, limitProcessingTasks, timeToWaitToContinueProcessing, processedTasks, toolbar_qm_is_visible, collaboration_speed_user_interface, debug;


	//inicializacao
	this.times = [];
	this.timeToStart = 0;
	this.notRunDevices = '';
	this.deviceInformation = null;
	this.mouseStationaryListener = null;
	this.state = false;
	this.processedTasks = 0;
	this.limitProcessingTasks = 0;
	this.timeToWaitToContinueProcessing = 0;
	this.toolbar_qm_is_visible = 0;
	this.collaboration_speed_user_interface = 3;
	this.debug = false;
}

QmachineWebClientConfig.prototype.config = function(parms) {
	
	if (window.hasOwnProperty('QM') === false) {
 		throw QMACHINE_IS_MISSING;
 		return;
    }
	if(parms.debug != null) {
		if (typeof parms.debug == 'boolean') {
			if(parms.debug == true) {
				console.log('Iniciando no modo DEBUG');
				this.debug = parms.debug;
			}
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "debug");
		}
	}
	if(parms.beforeStart != null) {
		if (typeof parms.beforeStart == 'function') {
			this.beforeStart = parms.beforeStart;
			if(TCC.debug == true) {
				console.log('Foi atribuída uma ação ao beforeStart');
			}
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "beforeStart");
		}
	}
	if(parms.afterStart != null) {
		if (typeof parms.afterStart == 'function') {
			TCC.afterStart = parms.afterStart;
			if(TCC.debug == true) {
				console.log('Foi atribuída uma ação ao afterStart');
			}
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "afterStart");
		}
	}
	if(parms.beforeStop != null) {
		if (typeof parms.beforeStop == 'function') { 
			TCC.beforeStop = parms.beforeStop;
			if(TCC.debug == true) {
				console.log('Foi atribuída uma ação ao beforeStop');
			}
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "beforeStop");
		}
	}
	if(parms.afterStop != null) {
		if (typeof parms.afterStop == 'function') { 
			TCC.afterStop = parms.afterStop;
			if(TCC.debug == true) {
				console.log('Foi atribuída uma ação ao afterStop');
			}
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "afterStop");
		}
	}
	if(parms.startIfTime != null) {
		if (typeof parms.startIfTime == 'string') {
			parms.startIfTime.toLowerCase();
			var times = parms.startIfTime.split(',');
			this.times = times;

			if(TCC.debug == true) {
				console.log('Configurando verificação temporal para: ' + times);
			}

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

			if(TCC.debug == true) {
				console.log('Definindo dispositivos eletrônicos em que não será executado o QMachine: ' + devices);
			}

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
	if(parms.runAfterNothingToDoMessage != null) {
		
		if (typeof parms.runAfterNothingToDoMessage == 'function') { 
			TCC.runAfterNothingToDoMessage = parms.runAfterNothingToDoMessage;
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "runAfterNothingToDoMessage");
		}
	}
	if(parms.runAfterTaskDone != null) {
		
		if (typeof parms.runAfterTaskDone == 'function') { 
			TCC.runAfterTaskDone = parms.runAfterTaskDone;
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "runAfterTaskDone");
		}
	}
	if(parms.waitAfterProcessingTasks != null) {
		
		if (typeof parms.waitAfterProcessingTasks == 'object') {

			this.limitProcessingTasks = parms.waitAfterProcessingTasks[0];
			this.timeToWaitToContinueProcessing = this.stringToTime(parms.waitAfterProcessingTasks[1]);

			if(TCC.debug == true) {
				console.log('Configurado que a cada ' + this.limitProcessingTasks + ' tarefas processadas será aguardado o intervalo de ' + this.timeToWaitToContinueProcessing  + ' milissegundos');
			}

		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "waitAfterProcessingTasks");
		}
	}
	if(parms.allowUserInterface != null) {

		if (typeof parms.allowUserInterface == 'boolean') {
			if(parms.allowUserInterface === true) {
				this.showUserInterface();
			}
		} else {
			throw UNEXPECTED_VALUE_PARM.replace("%X", "allowUserInterface");
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
	@description Execute uma função antes do processo de colaboração ser iniciado
	@author Alex Costa
	@since 2014-08
	@example
		TCC.config({
		    beforeStart: function() {
		        alert('Process will start');
		    }
		});
*/
QmachineWebClientConfig.prototype.beforeStart = function() {
	
};

/*
	@name afterStart
	@description Execute uma função após o processo de colaboração ser iniciado
	@author Alex Costa
	@since 2014-08
	@example
		TCC.config({
		    afterStart: function() {
		        alert('Process began');
		    }
		});
*/
QmachineWebClientConfig.prototype.afterStart = function() {
	
};

/*
	@name start
	@description Inicia o processo de colaboração
	@author Alex Costa
	@since 2014-08
	@example
		TCC.start();
*/
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
	@description Execute uma função antes do processo de colaboração ser interrompido
	@author Alex Costa
	@since 2014-08
	@example
		TCC.config({
		    beforeStop: function() {
		        alert('Process will be stopped');
		    }
		});
*/
QmachineWebClientConfig.prototype.beforeStop = function() {
	
};

/*
	@name afterStop
	@description Execute uma função após do processo de colaboração ser interrompido
	@author Alex Costa
	@since 2014-08
	@example
		TCC.config({
		    afterStop: function() {
		        alert('Process stopped');
		    }
		});
*/
QmachineWebClientConfig.prototype.afterStop = function() {
	
};

/*
	@name stop
	@description Para o processo de colaboração
	@author Alex Costa
	@since 2014-08
	@example
		TCC.stop();
*/
QmachineWebClientConfig.prototype.stop = function() {
	if(TCC.state === true) {
		this.beforeStop();
		QM.stop();
		TCC.state = false;
		this.afterStop();
	}
};

/*
	@name runAfterNothingToDoMessage
	@description Execute uma função após não encontrar nenhuma tarefa para ser processada
	@author Alex Costa
	@since 2014-09
	@example
		TCC.config({
		    runAfterNothingToDoMessage: function() {
		        alert('Nothing to do');
		    }
		});
*/
QmachineWebClientConfig.prototype.runAfterNothingToDoMessage = function() {
	
};

/*
	@name runAfterTaskDone
	@description Execute uma função após terminar de processar uma tarefa
	@author Alex Costa
	@since 2014-09
	@example
		TCC.config({
		    runAfterTaskDone: function(job_key) {
		        alert('Task: ' + job_key + ' is done!');
		    }
		});
*/
QmachineWebClientConfig.prototype.runAfterTaskDone = function(job_key) {
	
};

QmachineWebClientConfig.prototype.verifyTime = function() {
	
	var date = new Date();
	var day = date.getDay();
	var hours = date.getHours();
	var WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	
	if(this.times.length > 0) {

		if(TCC.debug == true) {
			console.log('Iniciando a verificação temporal');
		}

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

						if(TCC.debug == true) {
							console.log('Liberando a colaboração pela verificação temporal');
						}

						return true;
					}
					if( hours_of_day[0] > hours_of_day[1] && //if user set ex: (11-5)
						(
							(hours >= hours_of_day[0] && hours >= hours_of_day[1]) ||
							(hours <= hours_of_day[0] && hours <= hours_of_day[1])
						)
					) {
						
						if(TCC.debug == true) {
							console.log('Liberando a colaboração pela verificação temporal');
						}
						
						return true;
					}
					
				} else {

					if(TCC.debug == true) {
						console.log('Liberando a colaboração pela verificação temporal');
					}
					
					return true;
				}

				if(TCC.debug == true) {
					console.log('Colaboração não liberada devido a não passar em teste de verificação temporal');
				}
				
				return false;
			}
		}
		
		if(TCC.debug == true) {
			console.log('Colaboração não liberada devido a não passar em teste de verificação temporal');
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

	if(TCC.debug == true) {
		console.log('Carregando informações deste dispositivo eletrônico: ' + JSON.stringify(this.deviceInformation));
	}
}

QmachineWebClientConfig.prototype.verifyDevice = function() {
	for(var cont = 0; cont < this.notRunDevices.length; cont++) {

		if(cont == 0 && TCC.debug == true) {
			console.log('Verificando permissão de execução neste dispositivo');
		}

		if(this.deviceInformation.form_factor.toLowerCase() == this.notRunDevices[cont].toLowerCase()) {
			
			if(cont == 0 && TCC.debug == true) {
				console.log('Colaboração não permitida devido a dispositivo não ter permissão para colaborar');
			}

			return false;
		}
	}

	if(this.notRunDevices.length > 0 && TCC.debug == true) {
		console.log('Liberada a colaboração neste dispositivo');
	}

	return true;
}

/*
	@name configMouseStationaryListener
	@description Iniciará quando o cursor do mouse não apresentar movimento sobre a página acessada
	@author Alex Costa
	@since 2014-09
	@example
		TCC.config({
		    //you can set any formats, here we use the number 2 for example:
		    //'2m': starts after 2 minutes of no mouse
		    //'2s': starts after 2 seconds of no mouse
		    //'2': starts after 2 miliseconds of no mouse
		    //2: starts after 2 miliseconds of no mouse
		    startAsMouseIsStationary: '2m',
		});
*/
QmachineWebClientConfig.prototype.configMouseStationaryListener = function(element, time) {
	
	$(element).mouseover(function(){
	  	
	  	clearTimeout(TCC.mouseStationaryListener);

	  	if(TCC.debug == true) {
			console.log('Foi configurado o listener para o mouseStationaryListener em: ' + time);
		}

		TCC.mouseStationaryListener = setTimeout(function(){
			if(TCC.debug == true) {
				console.log('Foi detectado o listener para o mouseStationaryListener');
			}
			TCC.start();
		}, time);
	});

}

/*
	@name configLoseFocus
	@description Iniciará quando o usuário não estiver com a aba da página ativa (estiver minimizada ou visualizado outra aba do browser)
	@author Alex Costa
	@since 2014-09
	@example
		TCC.config({
		    loseFocus: true,
		});
*/
QmachineWebClientConfig.prototype.configLoseFocus = function() {

	if(TCC.debug == true) {
		console.log('Configurando o inicio da colaboração ao perder o foco na janela');
	}

	$(window).focus(function() {
		if(TCC.debug == true) {
			console.log('Foco na janela detectado, parando colaboração');
		}
	    TCC.stop();
	});

	$(window).blur(function() {
		if(TCC.debug == true) {
			console.log('Perdeu o foco na janela, iniciando colaboração');
		}
	    TCC.start();
	});
}

/* sobrescrevendo a função console.log para poder obter a saída do QMachine */
var oldLog = console.log;
console.log = function (message) {

	var identificada_saida_do_qm = false;

	if(message.substring(0, 17) == "Nothing to do ...") {
		identificada_saida_do_qm = true;
		TCC.runAfterNothingToDoMessage();
	}

	if(message.substring(0, 5) == "Done:") {
		identificada_saida_do_qm = true;
		var job_key = message.replace("Done: ", "");
		TCC.runAfterTaskDone(job_key);
	}

	//se estiver controlando waitAfterProcessingTasks
	if(identificada_saida_do_qm == true && TCC.limitProcessingTasks > 0 && TCC.timeToWaitToContinueProcessing > 0) {
		TCC.processedTasks++;

		if(TCC.processedTasks >= TCC.limitProcessingTasks) {
			TCC.processedTasks = 0;

			if(TCC.debug == true) {
				console.log('Limite de tarefas sequenciais executadas, aguardando ' + TCC.timeToWaitToContinueProcessing + ' milissegundos');
			}

			TCC.stop();
			setTimeout(function() {
				TCC.start();
			}, TCC.timeToWaitToContinueProcessing);
		}
	}

    oldLog.apply(console, arguments);
};


QmachineWebClientConfig.prototype.showUserInterface = function() {

	/* insere a interface com o usuário dentro do body da página hospedeira */
	var user_interface_html = "";
	user_interface_html += "<div class='qm_user_config'>";
	user_interface_html += "	<div class='play_pause_qm'></div>";
	user_interface_html += "	<div class='selecionar_velocidade_qm'>Utilizar poucos recursos</div>";
	user_interface_html += "</div>";
	user_interface_html += "<div class='button_open_close_toolbar_qm'></div>";
	
	$("body").html($("body").html() + user_interface_html);
	$(".qm_user_config").attr("style", "position: fixed; z-index: 99998; bottom: 0px; right: 0px; width: 100%; height: 32px; background-color: black; display: none;");
	$(".selecionar_velocidade_qm").attr("style", "color: white; height: 32px; font-family: 'Arial'; font-size: 16px; margin-top: 8px; margin-left: 50px; cursor: pointer;");
	$(".button_open_close_toolbar_qm").attr("style", "position: fixed; z-index: 99999; bottom: 0px; right: 10px; width: 35px; height: 32px; background: url('footer_button_up.png') right no-repeat #121212; display: block; -moz-border-radius: 4px 4px 0px 0px; -webkit-border-radius: 4px 4px 0px 0px; border-radius: 4px 4px 0px 0px;");

	/* verifica o estado da colaboração para iniciar com o botão "pausar colaboração" ou "iniciar colaboração" */
	if(TCC.state === false) { 
		$(".play_pause_qm").attr('style', 'height: 32px; width: 32px; float: left; background-size: 32px;  background-image: url("pause.png");');
	} else {
		$(".play_pause_qm").attr('style', 'height: 32px; width: 32px; float: left; background-size: 32px;  background-image: url("play.png");');
	}

	/*configurando o botão que mostra ou esconte a interface com o usuário */
	$(".button_open_close_toolbar_qm").click(function() {
		if(TCC.toolbar_qm_is_visible == 0) {
			$(".qm_user_config").slideDown();
			TCC.toolbar_qm_is_visible = 1;
		} else {
			$(".qm_user_config").slideUp();
			TCC.toolbar_qm_is_visible = 0;
		}
	});

	/* configurando o botão play/pause da interface com o usuário */
	$(".play_pause_qm").click(function(){
		if(TCC.state === false) {
			TCC.start();
			$(".play_pause_qm").css('background-image',  "url('pause.png')");
		} else {
			TCC.stop();
			$(".play_pause_qm").css('background-image',  "url('play.png')");
		}
	});

	/* configurando o botão para selecionar a velocidade da interface com o usuário */
	$(".selecionar_velocidade_qm").click(function() {
		if(TCC.collaboration_speed_user_interface == 1) {
			$(".selecionar_velocidade_qm").html("Utilizar muitos recursos");
			TCC.collaboration_speed_user_interface = 2;
		} else if(TCC.collaboration_speed_user_interface == 2) {
			$(".selecionar_velocidade_qm").html("Utilizar poucos recursos");
			TCC.collaboration_speed_user_interface = 3;
		} else {
			$(".selecionar_velocidade_qm").html("Utilizar médios recursos");
			TCC.collaboration_speed_user_interface = 1;
		}
	});
};

//define global object
var TCC = new QmachineWebClientConfig();
