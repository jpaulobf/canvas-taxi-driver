function playRadio1() {
	stopAllRadios();
	if (bgMusic1) {
		bgMusic1.play();
		bgMusic1.loop = true;
		currentRadioStation = 1;
	}			
}

function playRadio2() {
	stopAllRadios();
	if (bgMusic2) {
		bgMusic2.play();
		bgMusic2.loop = true;
		currentRadioStation = 2;
	}			
}

function playRadio3() {
	stopAllRadios();
	if (bgMusic3) {
		bgMusic3.play();
		bgMusic3.loop = true;
		currentRadioStation = 3;
	}			
}

function stopAllRadios() {
	bgMusic1.pause();
	bgMusic2.pause();
	bgMusic3.pause();
	bgMusic1.currentTime = 0;
	bgMusic2.currentTime = 0;
	bgMusic3.currentTime = 0;
	currentRadioStation = 0;
}

function playStartCarSound() {
	if (carStartSound && neverStarted) {
		neverStarted = false;
		carStartSound.volume = 0.03;
		carStartSound.play();
		playRadio1();
	}
}

function playCarEngineSound() {
	if (carEngineSound && !carEngineSoundOn) {
		carEngineSoundOn = true;
		carEngineSound.volume = 0.7;
		carEngineSound.loop = true;
		carEngineSound.play();
	}
}