//Controle do ciclo dia e noite
var nightAlpha			= 0;
var foward				= true;
var backward			= false;
var forealpha1			= 1;
var forealpha2			= 1;
var forealpha3			= 1;
var forealpha4			= 1;
var forealpha5			= 1;
var smoke1alpha			= 0;
var smoke2alpha			= 0;
var smoke1top			= 369;
var	smoke2top			= 390;

//Controla a colis?o com o cen?rio
var fore1Rect			= { left: 49, top: 305, right: 65, bottom: 369 };
var fore2Rect			= { left: 81, top: 321, right: 257, bottom: 353 };
var fore3Rect			= { left: 385, top: 339, right: 433, bottom: 353 };
var fore4Rect			= { left: 449, top: 337, right: 529, bottom: 353 };
var fore5Rect			= { left: 113, top: 577, right: 225, bottom: 593 };

var RectTrainRoad1		= { left: 33, top: 75, right: 97, bottom: 81 };
var RectTrainRoad2		= { left: 385, top: 75, right: 449, bottom: 81 };
var rightWallScenario	= { left: 849, top: 115, right: 850, bottom: 550 };

var back1RectR			= { left: 44, top: 0, right: 49, bottom: 353 };
var back2RectB			= { left: 95, top: 110, right: 387, bottom: 113 };
var back2RectR			= { left: 398, top: 0, right: 401, bottom: 113 };
var back2RectL			= { left: 81, top: 0, right: 86, bottom: 113 };

var back3RectL			= { left: 433, top: 0, right: 435, bottom: 113 };
var back3RectB			= { left: 445, top: 110, right: 850, bottom: 113 };

var back4RectT			= { left: 85, top: 145, right: 392, bottom: 151 };
var back4RectR			= { left: 394, top: 150, right: 401, bottom: 315 };
var back4RectB			= { left: 86, top: 314, right: 395, bottom: 321 };
var back4RectL			= { left: 81, top: 149, right: 88, bottom: 316 };

var back5RectT			= { left: 440, top: 145, right: 586, bottom: 151 };
var back5RectL			= { left: 433, top: 150, right: 440, bottom: 315 };
var back5RectR			= { left: 586, top: 150, right: 593, bottom: 315 };
var back5RectB			= { left: 438, top: 314, right: 587, bottom: 321 };

var back6RectT			= { left: 663, top: 145, right: 820, bottom: 151 };
var back6RectL			= { left: 657, top: 150, right: 664, bottom: 555 };
var back6RectR			= { left: 827, top: 154, right: 833, bottom: 391 };
var back6RectR2			= { left: 810, top: 401, right: 817, bottom: 555 };
var back6RectB			= { left: 661, top: 554, right: 815, bottom: 561 };

var back7RectT			= { left: 49, top: 353, right: 263, bottom: 360 };
var back7RectR			= { left: 266, top: 363, right: 273, bottom: 549 };
var back7RectB			= { left: 0, top: 554, right: 261, bottom: 561 };

var back8RectT			= { left: 315, top: 353, right: 631, bottom: 360 };
var back8RectB			= { left: 315, top: 554, right: 631, bottom: 561 };
var back8RectR			= { left: 634, top: 363, right: 641, bottom: 549 };
var back8RectL			= { left: 305, top: 363, right: 312, bottom: 549 };

//Placeholder para as imagens
var imageTile			= new Image();
var imageSprite1		= new Image();
var imageSprite2		= new Image();
var imageSprite3		= new Image();
var imageRadio			= new Image();
var imageSmoke			= new Image();
var imageSmoke2			= new Image();
var bgMusic1			= new Audio();
var bgMusic2			= new Audio();
var bgMusic3			= new Audio();
var carStartSound		= new Audio();
var carEngineSound		= new Audio();

//Controle de deslocamento dos sprites
var MAX_DIST_P_SEC		= 200;

//Controle para o sprite do trem
var trainPosX			= -600;
var trainPosY			= 53;

//Controle para o sprite do carro
var car					= null;
var neverStarted		= true;
var carEngineSoundOn	= false;
var currentRadioStation = 0;

//Classe representando um carro
function Car() {
	
	//privadas
	var VELOCIDADE_0		= 0;
	var VELOCIDADE_1		= 25;
	var VELOCIDADE_2		= 50;
	var VELOCIDADE_3		= 75;
	var VELOCIDADE_4		= 100;
	var carRectHor			= { left: -6, top: 8, right: 20, bottom: 19 };
	var carRectVer			= { left: 1, top: 0, right: 12, bottom: 26 };
	var carRectDiag			= { left: -5, top: 1, right: 19, bottom: 25 };

	//publicas
	this.currentGear		= 0; //0, 1, 2, 3, 4
	this.car_direction		= 1; //1 = Foward, 2 = Left, 3 = Right, 4 = Backward
	this.leftPosition		= 628;
	this.topPosition		= 250;
	this.car_angle			= 0;
	this.currentRect		= carRectVer;

	//--------------------------------------------metodos
	//------------------------------------------------------------------------------
	//M?todo: Muda a caixa de colis?o do ve?culo conforme seu angulo na tela
	this.setRectHor		= function() {	this.currentRect = carRectHor;}
	this.setRectVer		= function() {	this.currentRect = carRectVer;}
	this.setRectDiag	= function() {	this.currentRect = carRectDiag;}

	//M?todo: Verifica a colis?o
	this.getIntersect	= function(compareRect) {
		return !((this.leftPosition + this.currentRect.left) > compareRect.right || 
				 (this.leftPosition + this.currentRect.right) < compareRect.left || 
				 (this.topPosition + this.currentRect.top) > compareRect.bottom ||
				 (this.topPosition + this.currentRect.bottom) < compareRect.top);
	};


	//M?todo: Recupera a velocidade (constantes) do ve?culo com base na marcha atual
	this.getCarVel = function () {
		switch (this.currentGear) {
			case -1:
				return(this.currentGear);
				break;
			case 0:
				return(VELOCIDADE_0);
				break;
			case 1:
				return(VELOCIDADE_1);
				break;
			case 2:
				return(VELOCIDADE_2);
				break;
			case 3:
				return(VELOCIDADE_3);
				break;
			case 4:
				return(VELOCIDADE_4);
				break;
		}
		return (0);
	};

	//M?todo: Atualiza a posi??o do carro com base em sua velocidade
	this.updatePosition = function (progress) {
		
		//calcula a velocidade do carro;
		var vel = this.getCarVel();
		var calc_prog = progress / 1000;

		if (this.currentGear > 0) { //Carro andando para frente
								
			var calc_prog_vel		= calc_prog * vel;
			var calc_prog_half_vel	= calc_prog * vel / 2;

			if (this.car_angle == 0) { //Se estiver indo para o N
				this.topPosition -= calc_prog_vel;

			} else if (this.car_angle == 45) { //Se estiver indo para NE
				this.topPosition -= calc_prog_half_vel;
				this.leftPosition += calc_prog_half_vel;

			} else if (this.car_angle == 90) { //Se estiver indo para L
				this.leftPosition += calc_prog_vel;

			} else if (this.car_angle == 135) { //Se estiver indo para SD
				this.topPosition += calc_prog_half_vel;
				this.leftPosition += calc_prog_half_vel;

			} else if (this.car_angle == 180) { //Se estiver indo para o S
				this.topPosition += calc_prog_vel;

			} else if (this.car_angle == 225) { //Se estiver indo para o SO
				this.topPosition += calc_prog_half_vel;
				this.leftPosition -= calc_prog_half_vel;


			} else if (this.car_angle == 270) { //Se estiver indo para o O
				this.leftPosition -= calc_prog_vel;

			} else { //Se estiver indo para o NO
				this.topPosition -= calc_prog_half_vel;
				this.leftPosition -= calc_prog_half_vel;
			}
		} else if (vel == -1) { //Carro andando de R?

			var calc_prog_vel		= calc_prog * VELOCIDADE_1;
			var calc_prog_half_vel	= calc_prog * VELOCIDADE_1 / 2;

			if (this.car_angle == 0) {  //Se estiver indo para o N
				this.topPosition += calc_prog_vel;

			} else if (this.car_angle == 45) { //Se estiver indo para NE
				this.topPosition += calc_prog_half_vel;
				this.leftPosition -= calc_prog_half_vel;

			} else if (this.car_angle == 90) { //Se estiver indo para L
				this.leftPosition -= calc_prog_vel;

			} else if (this.car_angle == 135) { //Se estiver indo para SD
				this.topPosition -= calc_prog_half_vel;
				this.leftPosition -= calc_prog_half_vel;

			} else if (this.car_angle == 180) { //Se estiver indo para o S
				this.topPosition -= calc_prog_vel;

			} else if (this.car_angle == 225) { //Se estiver indo para o SO
				this.topPosition -= calc_prog_half_vel;
				this.leftPosition += calc_prog_half_vel;

			} else if (this.car_angle == 270) { //Se estiver indo para o O
				this.leftPosition += calc_prog_vel;

			} else { //Se estiver indo para o NO
				this.topPosition += calc_prog_half_vel;
				this.leftPosition += calc_prog_half_vel;
			}
		}

		//Limites do cen?rio
		if (this.topPosition < 0) {
			this.topPosition = 610;
		}
		if (this.topPosition > 610) {
			this.topPosition = 0;
		}
		if (this.leftPosition > 850) {
			this.leftPosition = 0;
		}
		if (this.leftPosition < 0) {
			this.leftPosition = 850;
		}
	};
	
}

/* 
	Author: Jo?o Paulo B. Faria
	Date: 01/12/2020
	Description: Realiza o Game Update 
*/
function update(progress) {
	
	//Calcula o FPS do jogo
	fps = Math.round((1000 / progress));

	//Calcula a posi??o x do trem
	controlTrainMovement(progress);

	//Calcula o movimento do carro
	controlCarMovement(progress);

	//Calcula o ciclo dia e noite
	controlNightDayCicle();

	/********************************************************************************/
	/*							Inner functions										*/
	/********************************************************************************/

	/* Inner function: Controla o movimento do trem */
	function controlTrainMovement(progress) {

		//Calcula a posi??o X do trem
		trainPosX += (((progress / 1000) * MAX_DIST_P_SEC));
		
		if (trainPosX > 860) {
			trainPosX = -600;
		}
	}

	/* Inner function: Controla o movimento do trem */
	function controlCarMovement(progress) {

		//Atualiza a posi??o do carro com base em sua velocidade
		car.updatePosition(progress);


		//Verifica se houve intersec??o com o foreground, caso positivo, torna-o transparente
		if (car.getIntersect(fore1Rect)) {
			forealpha1 = 0.5;
		} else {
			forealpha1 = 1;
		}
		
		if (car.getIntersect(fore2Rect)) {
			forealpha2 = 0.5;
		} else {
			forealpha2 = 1;
		}

		if (car.getIntersect(fore3Rect)) {
			forealpha3 = 0.5;
		} else {
			forealpha3 = 1;
		}

		if (car.getIntersect(fore4Rect)) {
			forealpha4 = 0.5;
		} else {
			forealpha4 = 1;
		}

		if (car.getIntersect(fore5Rect)) {
			forealpha5 = 0.5;
		} else {
			forealpha5 = 1;
		}

	
		if (false) {

		} else if (car.getIntersect(rightWallScenario)) {
			if (car.car_angle == 45) {
				car.setRectVer();
				car.leftPosition = rightWallScenario.left - car.currentRect.right - 2;
				car.car_angle	= 0;
			} else if (car.car_angle == 135) {
				car.setRectVer();
				car.leftPosition = rightWallScenario.left - car.currentRect.right - 2;
				car.car_angle	= 180;
			} else if (car.car_angle == 90) {
				car.currentGear	= 0;
				car.leftPosition = rightWallScenario.left - car.currentRect.right;
			}
		} else if (car.getIntersect(RectTrainRoad1) && car.car_angle != 180) {
			car.currentGear	= 0;
			car.car_angle	= 0;
			car.topPosition = RectTrainRoad1.bottom - car.currentRect.top;
		
		} else if (car.getIntersect(RectTrainRoad2) && car.car_angle != 180) {
			car.currentGear	= 0;
			car.car_angle	= 0;
			car.topPosition = RectTrainRoad2.bottom - car.currentRect.top;

		} else if (car.getIntersect(back1RectR)) {			
			if (car.car_angle == 315) {
				car.setRectVer();
				car.leftPosition = back1RectR.right - car.currentRect.left + 3;
				car.car_angle	= 0;
			} else if (car.car_angle == 225) {
				car.setRectVer();
				car.leftPosition = back1RectR.right - car.currentRect.left + 3;
				car.car_angle	= 180;
			} else if (car.car_angle == 270) {
				car.currentGear	= 0;
				car.leftPosition = back1RectR.right - car.currentRect.left;
			}
		} else if (car.getIntersect(back2RectB)) {
			if (car.car_angle == 0) {
				car.currentGear	= 0;
				car.topPosition = back2RectB.bottom - car.currentRect.top;
			} else if (car.car_angle == 45) {
				car.setRectHor();
				car.topPosition	= back2RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 90;
			} else if (car.car_angle == 315) {
				car.setRectHor();
				car.topPosition	= back2RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 270;
			}
		} else if (car.getIntersect(back2RectR)) {
			if (car.car_angle == 315) {
				car.setRectVer();
				car.leftPosition = back2RectR.right - car.currentRect.left;
				car.car_angle	= 0;
			} else if (car.car_angle == 225) {
				car.setRectVer();
				car.leftPosition = back2RectR.right - car.currentRect.left;
				car.car_angle	= 180;
			} else if (car.car_angle == 270) {
				car.currentGear	= 0;
				car.leftPosition = back2RectR.right - car.currentRect.left;
			}
		} else if (car.getIntersect(back2RectL)) {
			if (car.car_angle == 45) {
				car.setRectVer();
				car.leftPosition = back2RectL.left - car.currentRect.right - 2;
				car.car_angle	= 0;
			} else if (car.car_angle == 135) {
				car.setRectVer();
				car.leftPosition = back2RectL.left - car.currentRect.right - 2;
				car.car_angle	= 180;
			} else if (car.car_angle == 90) {
				car.currentGear	= 0;
				car.leftPosition = back2RectL.left - car.currentRect.right;
			}
		} else if (car.getIntersect(back3RectB)) {
			if (car.car_angle == 0) {
				car.currentGear	= 0;
				car.topPosition = back3RectB.bottom - car.currentRect.top;
			} else if (car.car_angle == 45) {
				car.setRectHor();
				car.topPosition	= back3RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 90;
			} else if (car.car_angle == 315) {
				car.setRectHor();
				car.topPosition	= back3RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 270;
			}
		} else if (car.getIntersect(back3RectL)) {
			if (car.car_angle == 45) {
				car.setRectVer();
				car.leftPosition = back3RectL.left - car.currentRect.right - 1;
				car.car_angle	= 0;
			} else if (car.car_angle == 135) {
				car.setRectVer();
				car.leftPosition = back3RectL.left - car.currentRect.right - 1;
				car.car_angle	= 180;
			} else if (car.car_angle == 90) {
				car.currentGear	= 0;
				car.leftPosition = back3RectL.left - car.currentRect.right;
			}
		} else if (car.getIntersect(back4RectT)) {
			if (car.car_angle == 180) {
				car.currentGear	= 0;
				car.topPosition = back4RectT.top - car.currentRect.bottom;
			} else if (car.car_angle == 225) {
				car.setRectHor();
				car.car_angle	= 270;
				car.topPosition	= back4RectT.top - car.currentRect.bottom - 1;
			} else if (car.car_angle == 135) {
				car.setRectHor();
				car.topPosition	= back4RectT.top - car.currentRect.bottom - 1;
				car.car_angle	= 90;
			}
		} else if (car.getIntersect(back4RectR)) {
			if (car.car_angle == 315) {
				car.setRectVer();
				car.leftPosition = back4RectR.right - car.currentRect.left + 3;
				car.car_angle	= 0;
			} else if (car.car_angle == 225) {
				car.setRectVer();
				car.leftPosition = back4RectR.right - car.currentRect.left + 3;
				car.car_angle	= 180;
			} else if (car.car_angle == 270) {
				car.currentGear	= 0;
				car.leftPosition = back4RectR.right - car.currentRect.left + 0;
			}
		} else if (car.getIntersect(back4RectB)) {
			if (car.car_angle == 0) {
				car.currentGear	= 0;
				car.topPosition = back4RectB.bottom - car.currentRect.top;
			} else if (car.car_angle == 45) {
				car.setRectHor();
				car.topPosition	= back4RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 90;
			} else if (car.car_angle == 315) {
				car.setRectHor();
				car.topPosition	= back4RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 270;
			}
		
		} else if (car.getIntersect(back4RectL)) {
			if (car.car_angle == 45) {
				car.setRectVer();
				car.leftPosition = back4RectL.left - car.currentRect.right - 2;
				car.car_angle	= 0;
			} else if (car.car_angle == 135) {
				car.setRectVer();
				car.leftPosition = back4RectL.left - car.currentRect.right - 2;
				car.car_angle	= 180;
			} else if (car.car_angle == 90) {
				car.currentGear	= 0;
				car.leftPosition = back4RectL.left - car.currentRect.right;
			}
		} else if (car.getIntersect(back5RectT)) {
			if (car.car_angle == 180) {
				car.currentGear	= 0;
				car.topPosition = back5RectT.top - car.currentRect.bottom;
			} else if (car.car_angle == 225) {
				car.setRectHor();
				car.car_angle	= 270;
				car.topPosition	= back5RectT.top - car.currentRect.bottom - 1;
			} else if (car.car_angle == 135) {
				car.setRectHor();
				car.topPosition	= back5RectT.top - car.currentRect.bottom - 1;
				car.car_angle	= 90;
			}
		} else if (car.getIntersect(back5RectL)) {
			if (car.car_angle == 45) {
				car.setRectVer();
				car.leftPosition = back5RectL.left - car.currentRect.right - 2;
				car.car_angle	= 0;
			} else if (car.car_angle == 135) {
				car.setRectVer();
				car.leftPosition = back5RectL.left - car.currentRect.right - 2;
				car.car_angle	= 180;
			} else if (car.car_angle == 90) {
				car.currentGear	= 0;
				car.leftPosition = back5RectL.left - car.currentRect.right;
			}
		} else if (car.getIntersect(back5RectR)) {
			if (car.car_angle == 315) {
				car.setRectVer();
				car.leftPosition = back5RectR.right - car.currentRect.left + 3;
				car.car_angle	= 0;
			} else if (car.car_angle == 225) {
				car.setRectVer();
				car.leftPosition = back5RectR.right - car.currentRect.left + 3;
				car.car_angle	= 180;
			} else if (car.car_angle == 270) {
				car.currentGear	= 0;
				car.leftPosition = back5RectR.right - car.currentRect.left + 0;
			}
		} else if (car.getIntersect(back5RectB)) {
			if (car.car_angle == 0) {
				car.currentGear	= 0;
				car.topPosition = back5RectB.bottom - car.currentRect.top;
			} else if (car.car_angle == 45) {
				car.setRectHor();
				car.topPosition	= back5RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 90;
			} else if (car.car_angle == 315) {
				car.setRectHor();
				car.topPosition	= back5RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 270;
			}
		} else if (car.getIntersect(back6RectT)) {
			if (car.car_angle == 180) {
				car.currentGear	= 0;
				car.topPosition = back6RectT.top - car.currentRect.bottom;
			} else if (car.car_angle == 225) {
				car.setRectHor();
				car.car_angle	= 270;
				car.topPosition	= back6RectT.top - car.currentRect.bottom - 1;
			} else if (car.car_angle == 135) {
				car.setRectHor();
				car.topPosition	= back6RectT.top - car.currentRect.bottom - 1;
				car.car_angle	= 90;
			}
		} else if (car.getIntersect(back6RectL)) {
			if (car.car_angle == 45) {
				car.setRectVer();
				car.leftPosition = back6RectL.left - car.currentRect.right - 2;
				car.car_angle	= 0;
			} else if (car.car_angle == 135) {
				car.setRectVer();
				car.leftPosition = back6RectL.left - car.currentRect.right - 2;
				car.car_angle	= 180;
			} else if (car.car_angle == 90) {
				car.currentGear	= 0;
				car.leftPosition = back6RectL.left - car.currentRect.right;
			}
		} else if (car.getIntersect(back6RectR)) {
			if (car.car_angle == 315) {
				car.setRectVer();
				car.leftPosition = back6RectR.right - car.currentRect.left;
				car.car_angle	= 0;
			} else if (car.car_angle == 225) {
				car.setRectVer();
				car.leftPosition = back6RectR.right - car.currentRect.left;
				car.car_angle	= 180;
			} else if (car.car_angle == 270) {
				car.currentGear	= 0;
				car.leftPosition = back6RectR.right - car.currentRect.left;
			}
		} else if (car.getIntersect(back6RectR2)) {
			if (car.car_angle == 315) {
				car.setRectVer();
				car.leftPosition = back6RectR2.right - car.currentRect.left + 3;
				car.car_angle	= 0;
			} else if (car.car_angle == 225) {
				car.setRectVer();
				car.leftPosition = back6RectR2.right - car.currentRect.left + 3;
				car.car_angle	= 180;
			} else if (car.car_angle == 270) {
				car.currentGear	= 0;
				car.leftPosition = back6RectR2.right - car.currentRect.left + 0;
			}
		} else if (car.getIntersect(back6RectB)) {
			if (car.car_angle == 0) {
				car.currentGear	= 0;
				car.topPosition = back6RectB.bottom - car.currentRect.top;
			} else if (car.car_angle == 45) {
				car.setRectHor();
				car.topPosition	= back6RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 90;
			} else if (car.car_angle == 315) {
				car.setRectHor();
				car.topPosition	= back6RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 270;
			}
		} else if (car.getIntersect(back7RectT)) {
			if (car.car_angle == 180) {
				car.currentGear	= 0;
				car.topPosition = back7RectT.top - car.currentRect.bottom;
			} else if (car.car_angle == 225) {
				car.setRectHor();
				car.car_angle	= 270;
				car.topPosition	= back7RectT.top - car.currentRect.bottom - 1;
			} else if (car.car_angle == 135) {
				car.setRectHor();
				car.topPosition	= back7RectT.top - car.currentRect.bottom - 1;
				car.car_angle	= 90;
			}
		} else if (car.getIntersect(back7RectR)) {
			if (car.car_angle == 315) {
				car.setRectVer();
				car.leftPosition = back7RectR.right - car.currentRect.left + 2;
				car.car_angle	= 0;
			} else if (car.car_angle == 225) {
				car.setRectVer();
				car.leftPosition = back7RectR.right - car.currentRect.left + 2;
				car.car_angle	= 180;
			} else if (car.car_angle == 270) {
				car.currentGear	= 0;
				car.leftPosition = back7RectR.right - car.currentRect.left;
			}
		} else if (car.getIntersect(back7RectB)) {
			if (car.car_angle == 0) {
				car.currentGear	= 0;
				car.topPosition = back7RectB.bottom - car.currentRect.top;
			} else if (car.car_angle == 45) {
				car.setRectHor();
				car.topPosition	= back7RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 90;
			} else if (car.car_angle == 315) {
				car.setRectHor();
				car.topPosition	= back7RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 270;
			}
		} else if (car.getIntersect(back8RectT)) {
			if (car.car_angle == 180) {
				car.currentGear	= 0;
				car.topPosition = back8RectT.top - car.currentRect.bottom;
			} else if (car.car_angle == 225) {
				car.setRectHor();
				car.car_angle	= 270;
				car.topPosition	= back8RectT.top - car.currentRect.bottom - 1;
			} else if (car.car_angle == 135) {
				car.setRectHor();
				car.topPosition	= back8RectT.top - car.currentRect.bottom - 1;
				car.car_angle	= 90;
			}
		} else if (car.getIntersect(back8RectR)) {
			if (car.car_angle == 315) {
				car.setRectVer();
				car.leftPosition = back8RectR.right - car.currentRect.left + 2;
				car.car_angle	= 0;
			} else if (car.car_angle == 225) {
				car.setRectVer();
				car.leftPosition = back8RectR.right - car.currentRect.left + 2;
				car.car_angle	= 180;
			} else if (car.car_angle == 270) {
				car.currentGear	= 0;
				car.leftPosition = back8RectR.right - car.currentRect.left;
			}
		} else if (car.getIntersect(back8RectB)) {
			if (car.car_angle == 0) {
				car.currentGear	= 0;
				car.topPosition = back8RectB.bottom - car.currentRect.top;
			} else if (car.car_angle == 45) {
				car.setRectHor();
				car.topPosition	= back8RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 90;
			} else if (car.car_angle == 315) {
				car.setRectHor();
				car.topPosition	= back8RectB.bottom - car.currentRect.top + 4;
				car.car_angle	= 270;
			}
		} else if (car.getIntersect(back8RectL)) {
			if (car.car_angle == 45) {
				car.setRectVer();
				car.leftPosition = back8RectL.left - car.currentRect.right - 2;
				car.car_angle	= 0;
			} else if (car.car_angle == 135) {
				car.setRectVer();
				car.leftPosition = back8RectL.left - car.currentRect.right - 2;
				car.car_angle	= 180;
			} else if (car.car_angle == 90) {
				car.currentGear	= 0;
				car.leftPosition = back8RectL.left - car.currentRect.right;
			}
		}
	}
	
	/* Inner function: Calcula o ciclo de dia e noite */
	function controlNightDayCicle() {
		if (foward) {
			nightAlpha += 0.00005;
			smoke1top -= 0.05;
			smoke2top -= 0.05;
		} else {
			nightAlpha -= 0.00005;
		}
		if (nightAlpha < 0.3 && !backward) {
			foward = true;
		} else {
			foward = false;
			backward = true;
			smoke1top = 369;
			smoke2top = 390;
		}
		if (nightAlpha <= 0) {
			nightAlpha = 0;
			backward = false;
			foward = true;
		}
	}
}


/* 
	Author: Jo?o Paulo B. Faria
	Date: 01/12/2020
	Description: Carrega o background, por hora, tiles est?ticos
*/
function renderBackground() {

	var bgCanvas	= document.getElementById("bgCanvas");
	var ctx			= bgCanvas.getContext("2d");

	var totalTiles		= 38;
	var tileX			= 16;
	var tileY			= 16;
	var tilesColumns	= 8;
	var tilesLines		= 21;
	var tileIndex		= 0;
	var tileMapDest		=  [[2, 4, 94, 126, 46, 70, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 101, 78, 102, 64, 92, 6, 88, 149, 157, 157, 90, 99, 99, 118, 125, 133, 141, 141, 38, 2, 2, 4],
							[2, 4, 94, 126, 47, 79, 71, 79, 71, 79, 71, 79, 71, 79, 71, 79, 71, 79, 102, 64, 92, 6, 81, 149, 157, 157, 91, 98, 98, 118, 125, 133, 141, 141, 38, 2, 2, 4],
							[2, 7, 15, 127, 135, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 64, 83, 83, 83, 149, 157, 157, 90, 100, 100, 118, 125, 133, 141, 141, 38, 2, 2, 4],	
							[2, 2, 10, 127,135, 10, 1, 1, 1, 1, 10, 8, 1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 4, 149, 157, 157, 157, 157, 50, 50, 50, 50, 42, 50, 38, 2, 2, 4],	
							[2, 2, 10, 127, 135, 10, 1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 4, 26, 50, 50, 75, 67, 44, 52, 52, 52, 60, 60, 37, 2, 2, 4],	
							[2, 3, 27, 127, 135, 27, 35, 1, 1, 3, 6, 27, 27, 27, 27, 27, 27, 27, 6, 35, 1, 2, 80, 80, 133, 76, 88, 88, 44, 52, 52, 52, 60, 60, 38, 2, 2, 4],	
							[2, 4, 94, 126, 134, 54, 36, 9, 9, 2, 13, 21, 13, 21, 13, 21, 32, 24, 102, 59, 2, 2, 11, 125, 133, 76, 67, 28, 44, 52, 52, 52, 60, 60, 38, 2, 2, 4],	
							[2, 4, 94, 126, 0, 54, 36, 2, 2, 2, 3, 27, 19, 19, 19, 27, 27, 35, 102, 72, 2, 2, 117, 125, 133, 75, 82, 43, 44, 52, 52, 52, 60, 68, 38, 2, 2, 88],	
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 72, 80, 136, 144, 152, 152, 152, 160, 37, 102, 74, 2, 2, 118, 125, 133, 76, 28, 83, 44, 52, 52, 52, 60, 68, 38, 2, 2, 67],	
							[2, 4, 94, 126, 0, 54, 36, 2, 2, 73, 6, 88, 145, 153, 153, 153, 153, 29, 102, 73, 2, 2, 117, 125, 133, 75, 34, 110, 44, 52, 52, 52, 60, 60, 38, 2, 2, 28],	
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 74, 6, 81, 145, 153, 153, 153, 165, 29, 103, 74, 2, 2, 117, 125, 133, 60, 60, 60, 50, 50, 42, 42, 50, 50, 29, 2, 2, 28],	
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 73, 92, 92, 145, 153, 153, 153, 153, 29, 102, 74, 2, 2, 118, 125, 133, 60, 64, 32, 24, 149, 157, 157, 157, 34, 36, 2, 2, 82],
							[2,	4, 94, 126, 134, 54, 36, 2, 2, 2, 7, 15, 23, 31, 31, 31, 31, 39, 102, 73, 2, 2, 117, 125, 133, 60, 33, 1, 103, 17, 149, 157, 157, 157, 37, 2, 2, 43],
							[2,	4, 94, 126, 134, 54, 36, 2, 2, 2, 13, 21, 13, 21, 13, 21, 32, 17, 102, 38, 2, 2, 28, 44, 52, 60, 33, 32, 149, 32, 149, 157, 157, 165, 38, 2, 2, 83],
							[2, 49, 57, 126, 134, 54, 36, 2, 2, 45, 53, 61, 53, 61, 53, 61, 53, 61, 102, 38, 2, 2, 33, 44, 52, 60, 13, 12, 21, 33, 149, 157, 28, 157, 38, 2, 2, 4],
							[2,	49, 57, 126, 134, 54, 36, 2, 2, 46, 93, 85, 69, 69, 69, 69, 85, 93, 102, 38, 2, 2, 33, 44, 52, 60, 65, 25, 25, 25, 149, 157, 157, 157, 38, 9, 9, 4],
							[2,	49, 57, 126, 134, 54, 36, 2, 2, 46, 54, 62, 101, 101, 101, 78, 86, 94, 102, 38, 2, 32, 7, 23, 31, 31, 31, 31, 31, 31, 14, 14, 31, 50, 39, 32, 32, 7],
							[2, 49, 57, 126, 134, 54, 36, 2, 2, 46, 13, 62, 70, 101, 101, 101, 86, 94, 102, 38, 2, 32, 32, 10, 8, 1, 1, 1, 1, 1, 16, 1, 1, 10, 32, 32, 32, 32],
							[2, 4, 158, 126, 134, 54, 36, 2, 2, 46, 54, 62, 70, 77, 70, 101, 87, 94, 102, 38, 2, 32, 32, 10, 1, 1, 16, 1, 1, 1, 1, 1, 8, 10, 32, 32, 32, 32],
							[2,	4, 94, 126, 134, 54, 36, 2, 2, 46, 54, 62, 101, 78, 101, 78, 87, 94, 102, 38, 2, 32, 3, 13, 48, 56, 11, 27, 12, 12, 12, 20, 19, 27, 35, 32, 32, 3],
							[2, 4, 94, 126, 0, 54, 36, 2, 2, 46, 54, 62, 70, 101, 101, 77, 87, 94, 102, 38, 2, 2, 4, 12, 48, 56, 49, 57, 72, 80, 136, 144, 152, 160, 37, 9, 9, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 46, 13, 62, 77, 70, 101, 78, 86, 94, 102, 38, 2, 2, 4, 12, 48, 56, 49, 57, 73, 81, 66, 145, 153, 161, 29, 2, 2, 4],
							[2,	4, 94, 126, 0, 54, 36, 2, 2, 47, 55, 63, 71, 79, 71, 79, 55, 63, 102, 38, 2, 2, 4, 12, 48, 56, 49, 57, 74, 6, 66, 145, 153, 161, 29, 2, 2, 4],
							[9,	4, 94, 126, 134, 54, 36, 9, 9, 2, 83, 25, 25, 25, 25, 25, 83, 32, 103, 38, 9, 9, 4, 12, 48, 56, 12, 14, 73, 84, 84, 145, 153, 153, 29, 2, 2, 4],
							[32, 7, 15, 127, 135, 15, 30, 32, 32, 7, 23, 31, 31, 31, 31, 31, 31, 31, 50, 39, 32, 32, 96, 66, 110, 88, 102, 12, 13, 20, 23, 42, 50, 50, 29, 2, 2, 4],
							[32, 32, 10, 127, 135, 10, 32, 32, 32, 32, 10, 8, 1, 1, 1, 16, 1, 1, 10, 32, 32, 32, 96, 28, 6, 6, 107, 115, 115, 88, 118, 125, 133, 141, 37, 2, 2, 4],
							[32, 32, 10, 127, 135, 10, 32, 32, 32, 32, 10, 1, 1, 16, 1, 1, 1, 8, 10, 32, 32, 32, 96, 28, 103, 6, 102, 73, 66, 34, 117, 125, 133, 141, 38, 2, 2, 4],
							[32, 3, 27, 127, 135, 27, 35, 32, 32, 59, 59, 59, 59, 59, 84, 84, 59, 59, 11, 35, 32, 32, 75, 34, 66, 82, 102, 107, 115, 88, 118, 125, 133, 142, 38, 2, 2, 4],
							[9, 4, 94, 126, 134, 54, 36, 9, 9, 45, 53, 61, 53, 61, 53, 61, 53, 61, 102, 37, 9, 2, 97, 97, 44, 52, 60, 76, 66, 34, 117, 125, 133, 141, 38, 2, 2, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 46, 93, 85, 69, 69, 69, 69, 85, 93, 102, 38, 2, 2, 143, 69, 44, 52, 60, 75, 6, 6, 118, 125, 133, 141, 38, 2, 2, 4],
							[2, 4, 94, 126, 0, 56, 37, 2, 2, 46, 54, 62, 70, 101, 101, 101, 86, 94, 102, 38, 2, 2, 70, 78, 44, 52, 60, 76, 6, 103, 117, 125, 104, 112, 128, 40, 2, 4],
							[2, 4, 94, 126, 0, 56, 38, 2, 2, 46, 54, 62, 101, 101, 101, 77, 86, 94, 102, 38, 2, 2, 100, 100, 44, 52, 60, 76, 82, 6, 118, 125, 104, 112, 128, 41, 2, 4],
							[2, 4, 94, 126, 0, 56, 38, 2, 2, 46, 13, 62, 101, 101, 101, 78, 86, 94, 102, 38, 2, 2, 84, 84, 44, 52, 60, 76, 105, 113, 117, 125, 104, 112, 128, 41, 2, 4],
							[2, 4, 94, 126, 0, 56, 38, 2, 2, 46, 13, 62, 70, 101, 101, 101, 86, 94, 102, 38, 2, 2, 4, 109, 108, 108, 158, 75, 106, 114, 118, 125, 104, 112, 128, 41, 2, 4],
							[2, 4, 94, 126, 0, 56, 38, 2, 2, 46, 54, 62, 101, 77, 70, 101, 87, 94, 102, 38, 2, 2, 4, 139, 123, 131, 94, 95, 12, 14, 76, 28, 157, 157, 38, 41, 2, 4],
							[2, 4, 94, 126, 0, 56, 38, 9, 9, 47, 55, 63, 71, 79, 71, 79, 55, 63, 102, 38, 9, 9, 12, 13, 12, 21, 94, 13, 49, 57, 65, 33, 149, 165, 29, 2, 2, 4],
							[2, 4, 94, 126, 0, 56, 38, 2, 32, 7, 23, 31, 31, 31, 31, 31, 31, 31, 50, 39, 32, 32, 96, 111, 5, 119, 94, 159, 49, 57, 65, 33, 149, 157, 29, 2, 2, 4],
							[2, 4, 94, 126, 134, 158, 38, 2, 32, 32, 10, 8, 1, 1, 1, 1, 1, 1, 10, 32, 32, 32, 96, 111, 5, 119, 94, 95, 49, 57, 64, 32, 149, 162, 29, 2, 2, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 32, 32, 10, 8, 1, 1, 1, 1, 1, 1, 10, 32, 32, 32, 96, 111, 5, 119, 94, 95, 49, 57, 64, 32, 149, 157, 29, 9, 9, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 32, 32, 10, 1, 1, 1, 1, 1, 1, 8, 10, 32, 32, 32, 7, 15, 6, 15, 15, 15, 15, 23, 31, 31, 31, 50, 39, 32, 32, 7],
							[2, 4, 94, 126, 134, 54, 36, 2, 32, 32, 10, 1, 1, 1, 1, 1, 1, 8, 10, 32, 32, 32, 32, 32, 10, 1, 1, 1, 1, 1, 1, 1, 8, 10, 32, 32, 32, 32],
							[2, 4, 94, 126, 134, 54, 36, 2, 32, 3, 6, 27, 27, 27, 27, 27, 27, 27, 6, 27, 27, 27, 27, 27, 6, 27, 27, 27, 19, 19, 19, 27, 27, 6, 35, 32, 32, 3],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 45, 53, 61, 53, 61, 53, 61, 53, 61, 53, 61, 53, 61, 102, 12, 46, 111, 136, 146, 154, 154, 154, 154, 13, 20, 36, 2, 2, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 46, 104, 120, 128, 128, 108, 108, 108, 108, 108, 108, 108, 108, 102, 14, 46, 111, 5, 136, 146, 154, 154, 154, 154, 154, 37, 2, 2, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 46, 104, 112, 112, 112, 139, 139, 132, 132, 121, 129, 137, 139, 102, 14, 46, 111, 5, 119, 148, 156, 164, 164, 164, 164, 38, 2, 2, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 46, 28, 6, 50, 50, 58, 116, 139, 131, 121, 137, 139, 123, 102, 14, 46, 111, 150, 119, 147, 155, 163, 163, 163, 163, 38, 2, 2, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 46, 104, 120, 128, 128, 108, 108, 139, 139, 139, 123, 124, 124, 102, 14, 46, 111, 151, 119, 148, 156, 164, 164, 164, 162, 38, 2, 2, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 46, 28, 6, 50, 50, 58, 116, 140, 139, 122, 130, 138,	139, 102, 14, 46, 111, 5, 119, 148, 156, 164, 164, 164, 162, 38, 2, 2, 4],
							[2,	4, 94, 126, 134, 54, 36, 2, 2, 46, 104, 120, 128, 128, 108, 108, 139, 140, 122, 138, 122, 138, 102, 14, 46, 111, 5, 119, 147, 155, 163, 163, 163, 163, 38, 2, 2, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 46, 104, 112, 112, 112, 139, 139, 131, 139, 139, 139, 123, 131, 102, 14,	50, 31, 31, 31, 31, 31, 31, 31, 31, 31, 39, 32, 32, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 2, 47, 55, 63, 55, 63, 55, 63, 55, 63, 55, 63, 55, 63, 102, 14, 29,	12, 13, 12, 13, 12, 13, 12, 13, 12, 21, 32, 32, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 32, 7, 23, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 39, 32, 32, 1, 1, 1, 1, 1, 1, 1, 32, 32, 32, 4],
							[2, 4, 94, 126, 134, 54, 36, 2, 32, 32, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,	32, 32, 32, 1, 1, 1, 1, 1, 1, 1, 32, 32, 32, 4]
							];

	var mapItem			= null;
	var scale			= 1;
	var destPosX		= 0;
	var destPosY		= 0;
	var srcTileIndex	= 0;
	var srcPosX			= 0;
	var srcPosY			= 0;
			
	//Renderiza o background
	drawBackGroundOnScreen();

	/********************************************************************************/
	/*							Inner functions										*/
	/********************************************************************************/

	/* Inner function: renderiza o BG */
	function drawBackGroundOnScreen() {

		for (var column = 0; column < tileMapDest.length; column++) {

			mapItem			= tileMapDest[column];
			destPosX		= column;

			for (var inner = 0; inner < mapItem.length; inner++) {

				destPosY		= inner;
				srcTileIndex	= mapItem[inner];

				srcPosX			= (srcTileIndex % tilesColumns) * tileX;
				srcPosY			= Math.floor(srcTileIndex / tilesColumns) * tileY;
			
				ctx.drawImage(imageTile, 
							  srcPosX, 
							  srcPosY, 
							  tileX, 
							  tileY, 
							  (destPosX * tileX * scale) + 1, 
							  (destPosY * tileY * scale) + 1, 
							  tileX * scale, 
							  tileY * scale);

			}				
		}

		//Informa que o background fora renderizado, de forma a n?o recarregar.
		isBgRendered = true;
	}
}

/* 
	Author: Jo?o Paulo B. Faria
	Date: 01/12/2020
	Description: Renderiza os Sprites do jogo 
*/
function renderSprites() {

	//Recupera o canvas
	var canvas	= document.getElementById("gameCanvas");
	var ctx		= canvas.getContext("2d");

	//Limpa o canvas e imprime os FPSs
	ctx.clearRect(0, 0, 850, 610);
	ctx.fillText("FPS: " + fps, 10, 10);
	ctx.fillText("CarX/Y: " + Math.round(car.leftPosition) + "/" + Math.round(car.topPosition), 10, 30);
	

	//Desenha o sprite 1
	ctx.drawImage(imageSprite1, 
				  trainPosX, 
				  trainPosY);


	//save the unrotated context of the canvas
	ctx.save();

	//move to the center of the canvas
	ctx.translate(car.leftPosition + (imageSprite2.width/2), car.topPosition + (imageSprite2.height/2));

	//rotate the canvas to the specified degrees
	ctx.rotate(car.car_angle * Math.PI/180);


	//Desenha o sprite 1
	ctx.drawImage(imageSprite2, 
				  0 - (imageSprite2.width/2), 
				  0 - (imageSprite2.height/2));

	if (nightAlpha > 0.25) {
		ctx.globalAlpha = nightAlpha;
		ctx.drawImage(imageSprite3, 
					  0 - (imageSprite3.width/2), 
					  0 - (imageSprite2.height) - 10);
		ctx.globalAlpha = 1;
	}
	


	// we?re done with the rotating so restore the unrotated context
	ctx.restore();
}

/* 
	Author: Jo?o Paulo B. Faria
	Date: 01/12/2020
	Description: Carrega os objetos de foreground e informa a renderiza??o.
				 Deve ser carregado somente uma vez.
*/
function renderForeground() {

	//Recupera o canvas
	var fgCanvas	= document.getElementById("fgCanvas");
	var ctx			= fgCanvas.getContext("2d");

	ctx.clearRect(0, 0, 850, 610);

	//Desenha os objetos do cen?rio que ficar?o em foreground (alguns magic numbers... :-( corrigir isso!)
	ctx.drawImage(imageTile, 80, 16, 16, 16, 113, 65, 16, 16);
	ctx.drawImage(imageTile, 80, 16, 16, 16, 145, 65, 16, 16);
	ctx.drawImage(imageTile, 64, 16, 16, 16, 321, 65, 16, 16);
	ctx.drawImage(imageTile, 80, 16, 16, 16, 353, 65, 16, 16);

	ctx.drawImage(imageTile, 0, 96, 16, 16, 481, 65, 16, 16);
	ctx.drawImage(imageTile, 0, 96, 16, 16, 497, 65, 16, 16);
	ctx.drawImage(imageTile, 0, 96, 16, 16, 513, 65, 16, 16);
	ctx.drawImage(imageTile, 0, 96, 16, 16, 529, 65, 16, 16);
	ctx.drawImage(imageTile, 0, 96, 16, 16, 545, 65, 16, 16);
	ctx.drawImage(imageTile, 0, 96, 16, 16, 561, 65, 16, 16);
	ctx.drawImage(imageTile, 0, 96, 16, 16, 577, 65, 16, 16);

	ctx.globalAlpha = forealpha1;
	ctx.drawImage(imageTile, 16, 128, 16, 16, 49, 305, 16, 16);
	ctx.drawImage(imageTile, 16, 48, 16, 16, 49, 321, 16, 16);
	ctx.drawImage(imageTile, 16, 48, 16, 16, 49, 337, 16, 16);
	ctx.drawImage(imageTile, 16, 48, 16, 16, 49, 353, 16, 16);
	ctx.globalAlpha = 1;

	ctx.globalAlpha = forealpha2;
	ctx.drawImage(imageTile, 0, 144, 16, 16, 81, 337, 16, 16);
	ctx.drawImage(imageTile, 48, 112, 16, 16, 97, 321, 16, 16);
	ctx.drawImage(imageTile, 48, 112, 16, 16, 97, 321, 16, 16);
	ctx.drawImage(imageTile, 0, 160, 16, 16, 113, 321, 16, 16);
	ctx.drawImage(imageTile, 0, 176, 16, 16, 129, 321, 16, 16);
	ctx.drawImage(imageTile, 32, 160, 16, 16, 145, 321, 16, 16);
	ctx.drawImage(imageTile, 96, 0, 16, 16, 161, 321, 16, 16);
	ctx.drawImage(imageTile, 96, 0, 16, 16, 177, 321, 16, 16);
	ctx.drawImage(imageTile, 48, 160, 16, 16, 193, 321, 16, 16);
	ctx.drawImage(imageTile, 48, 112, 16, 16, 97, 337, 16, 16);
	ctx.drawImage(imageTile, 0, 160, 16, 16, 113, 337, 16, 16);
	ctx.drawImage(imageTile, 16, 160, 16, 16, 129, 337, 16, 16);
	ctx.drawImage(imageTile, 64, 176, 16, 16, 145, 337, 16, 16);
	ctx.drawImage(imageTile, 64, 176, 16, 16, 161, 337, 16, 16);
	ctx.drawImage(imageTile, 112, 192, 16, 16, 177, 337, 16, 16);
	ctx.drawImage(imageTile, 48, 160, 16, 16, 193, 337, 16, 16);
	ctx.drawImage(imageTile, 4*16, 9*16, 16, 16, 209, 337, 16, 16);
	ctx.drawImage(imageTile, 1*16, 8*16, 16, 16, 225, 337, 16, 16);
	ctx.drawImage(imageTile, 1*16, 8*16, 16, 16, 241, 337, 16, 16);
	ctx.globalAlpha = 1;


	ctx.globalAlpha = forealpha3;
	ctx.drawImage(imageTile, 0, 192, 16, 16, 385, 339, 16, 16);
	ctx.drawImage(imageTile, 0, 192, 16, 16, 401, 339, 16, 16);
	ctx.drawImage(imageTile, 0, 192, 16, 16, 417, 339, 16, 16);
	ctx.globalAlpha = 1;

	ctx.globalAlpha = forealpha4;
	ctx.drawImage(imageTile, 16, 176, 16, 16, 449, 337, 16, 16);
	ctx.drawImage(imageTile, 48, 176, 16, 16, 465, 337, 16, 16);
	ctx.drawImage(imageTile, 32, 176, 16, 16, 481, 337, 16, 16);
	ctx.drawImage(imageTile, 48, 176, 16, 16, 497, 337, 16, 16);
	ctx.drawImage(imageTile, 48, 176, 16, 16, 513, 337, 16, 16);
	ctx.globalAlpha = 1;

	ctx.globalAlpha = forealpha5;
	ctx.drawImage(imageTile, 64, 144, 16, 16, 113, 577, 16, 16);
	ctx.drawImage(imageTile, 48, 144, 16, 16, 129, 577, 16, 16);
	ctx.drawImage(imageTile, 48, 144, 16, 16, 145, 577, 16, 16);
	ctx.drawImage(imageTile, 64, 144, 16, 16, 161, 577, 16, 16);
	ctx.drawImage(imageTile, 64, 144, 16, 16, 177, 577, 16, 16);
	ctx.drawImage(imageTile, 64, 144, 16, 16, 193, 577, 16, 16);
	ctx.drawImage(imageTile, 64, 144, 16, 16, 209, 577, 16, 16);
	ctx.globalAlpha = 1;


	ctx.globalAlpha = 0.5;
	if (currentRadioStation != 0) {
		ctx.drawImage(imageRadio, 740, 10);
	}

	switch (currentRadioStation) {
		case 1:
			ctx.fillStyle = "#444455";
			ctx.fillRect(771, 18, 16, 5);
			break;

		case 2:
			ctx.fillStyle = "#444455";
			ctx.fillRect(793, 18, 16, 5);
			break;

		case 3:
			ctx.fillStyle = "#444455";
			ctx.fillRect(815, 18, 16, 5);
			break;
	}

	
	ctx.drawImage(imageSmoke, 402, smoke1top);
	ctx.drawImage(imageSmoke2, 433, smoke2top);
	ctx.globalAlpha = 1;


	//Borda externa 
	ctx.strokeStyle = "#AAAAAA";
	ctx.strokeRect(0, 0, 850, 610);
}

/* 
	Author: Jo?o Paulo B. Faria
	Date: 01/12/2020
	Description: Renderiza o ciclo dia/noite
*/
function renderDayNightCanvas() {

	//Recupera o canvas
	var timeCanvas	= document.getElementById("timeCanvas");
	var ctx			= timeCanvas.getContext("2d");

	//Renderiza o layer transparente simulando dia e noite (melhorar...)
	ctx.clearRect(0, 0, 850, 610);
	ctx.globalAlpha = nightAlpha;
	ctx.fillStyle = "#000055";
	ctx.fillRect(0, 0, 850, 610);
	ctx.globalAlpha = 1.0;
}

/* 
	Author: Jo?o Paulo B. Faria
	Date: 01/12/2020
	Description: Tela de Load
*/
function renderLoadScreen(percentage) {

	//Recupera o canvas
	var loadCanvas	= document.getElementById("loading");
	var ctx			= timeCanvas.getContext("2d");

	//Verifica a porcentagem e desenha o progresso
	if (percentage < 100) {

		//desenha o fundo do canvas
		ctx.clearRect(0, 0, 850, 610);
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, 850, 610);
		
		//desenha a caixa de load
		ctx.strokeStyle = "#AAAAAA";
		ctx.strokeRect(325, 290, 197, 20);
		ctx.fillStyle = "#00FF00";

		//calcula quantas barras preencher
		var times = Math.floor(percentage / 7.69);

		//preenche as barras
		for (var i = 0; i < times; i++) {
			ctx.fillRect(327 + (i * 15), 292, 14, 16);
		}
	} else {
		ctx.clearRect(0, 0, 850, 610);
	}
}

/* 
	Author: Jo?o Paulo B. Faria
	Date: 01/12/2020
	Description: Controla as teclas do teclado
*/
function keyControl(event) {

	if (event.keyCode == 49) {
		playRadio1();
	} else if (event.keyCode == 50) {
		playRadio2();
	} else if (event.keyCode == 51) {
		playRadio3();
	} else if (event.keyCode == 52) {
		stopAllRadios();
	}

	if (event.keyCode == 38) {
		if (car.currentGear == 0) {
			playStartCarSound();
		}
		
		if (car.currentGear < 4) {
			car.currentGear++;
		}
	} else if (event.keyCode == 40) {
		if (car.currentGear > -1) {
			car.currentGear--;
		}
	} else if (event.keyCode == 37) {
		car.car_angle-=45;
		if (car.car_angle < 0) {
			car.car_angle+=360;
		}

	} else if (event.keyCode == 39) {
		car.car_angle+=45;
		if (car.car_angle >= 360) {
			car.car_angle-=360;
		}
	}

	if (car.car_angle == 0 || car.car_angle == 180) {
		car.setRectVer();
	} else if (car.car_angle == 90 || car.car_angle == 270) {
		car.setRectHor();
	} else {
		car.setRectDiag();
	}
}

/* 
	Author: Jo?o Paulo B. Faria
	Date: 01/12/2020
	Description: Carrega as imagens e inicia o jogo
*/
function init() {

	bgMusic1.addEventListener("canplaythrough", music1Loaded, {once:true});
	bgMusic1.src = "./sound/music.ogg";
	renderLoadScreen(10);

	function music1Loaded() {
		bgMusic2.addEventListener("canplaythrough", music2Loaded, {once:true});
		bgMusic2.src = "./sound/music2.mp3";
		renderLoadScreen(15);

		function music2Loaded() {

			bgMusic3.addEventListener("canplaythrough", allMusicLoaded, {once:true});
			bgMusic3.src = "./sound/music3.mp3";
			renderLoadScreen(20);
		}
	}
	
	function allMusicLoaded() {

		carStartSound.addEventListener("canplaythrough", carStartSoundLoaded, {once:true});
		carStartSound.src = "./sound/car_start.mp3";
		renderLoadScreen(30);
	
		function carStartSoundLoaded() {

			carEngineSound.addEventListener("canplaythrough", carEngineSoundLoaded, {once:true});
			carEngineSound.src = "./sound/car_e_loop_2.mp3";
			renderLoadScreen(40);


			function carEngineSoundLoaded() {

				imageSprite1.addEventListener("load", loadCar, false);
				imageSprite1.src = "./img/train.gif";
				renderLoadScreen(50);			

				function loadCar() {
					imageSprite2.addEventListener("load", carLoaded, false);
					imageSprite2.src = "./img/carro.gif";
					renderLoadScreen(60);

					function carLoaded() {
						
						imageSprite3.addEventListener("load", lightLoaded, false);
						imageSprite3.src = "./img/farol.gif";
						renderLoadScreen(70);

						function lightLoaded() {

							imageTile.addEventListener("load", tilesLoaded, false);
							imageTile.src = "./img/tiles2.gif";
							renderLoadScreen(80);							

							function tilesLoaded() {

								
								imageSmoke.addEventListener("load", smokeLoaded, false);
								imageSmoke.src = "./img/fumaca.png";
								imageSmoke2.src = imageSmoke.src;
								renderLoadScreen(90);

								function smokeLoaded() {

									imageRadio.addEventListener("load", start, false);
									imageRadio.src = "./img/radio.gif";
									renderLoadScreen(100);

									function start() {

										//Inicializa??o							
										car = new Car();
										
										//Controla o teclado
										document.addEventListener("keyup", keyControl, false);

										//Aciona o gameloop
										window.requestAnimationFrame(gameloop);
									}
								}
							}
						}
					}
				}
			}
		}
	}
}