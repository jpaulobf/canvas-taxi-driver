//C�lculo de performance do jogo
var fps					= 0;

//Controle para os renderes
var lastRender			= 0;
var isBgRendered		= false;

/* 
	Author: Jo�o Paulo B. Faria
	Date: 01/12/2020
	Description: Controla o gameloop
*/
function gameloop(timestamp) {

	//Calcula o tempo de execu��o do �ltimo quadro
	var progress = timestamp - lastRender;

	//Solicita o update do jogo
	update(progress);

	//Se n�o renderizado, solicita o render do background
	if (!isBgRendered) {
		renderBackground();
	}
  
	//Renderiza os sprites
	renderSprites();

	//Se n�o renderizado, solicita o render do foreground
	renderForeground();

	//Renderiza o ciclo d/n
	renderDayNightCanvas();

	//Atualiza o loop
	lastRender = timestamp;
	window.requestAnimationFrame(gameloop);
}