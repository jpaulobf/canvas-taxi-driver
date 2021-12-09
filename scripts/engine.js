//Cálculo de performance do jogo
var fps					= 0;

//Controle para os renderes
var lastRender			= 0;
var isBgRendered		= false;

/* 
	Author: João Paulo B. Faria
	Date: 01/12/2020
	Description: Controla o gameloop
*/
function gameloop(timestamp) {

	//Calcula o tempo de execução do último quadro
	var progress = timestamp - lastRender;

	//Solicita o update do jogo
	update(progress);

	//Se não renderizado, solicita o render do background
	if (!isBgRendered) {
		renderBackground();
	}
  
	//Renderiza os sprites
	renderSprites();

	//Se não renderizado, solicita o render do foreground
	renderForeground();

	//Renderiza o ciclo d/n
	renderDayNightCanvas();

	//Atualiza o loop
	lastRender = timestamp;
	window.requestAnimationFrame(gameloop);
}