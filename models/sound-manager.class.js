class SoundManager {
    constructor() {
        this.bgMusic = new Audio('audio/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.5; // Standard Lautstärke
        this.volumeStates = ['off', 'low', 'high'];
        this.currentVolumeState = 1; // Start mit Lautstärke 'off'

        this.updateVolumeButton();
        this.addVolumeButtonListeners();
        this.playBackgroundMusic(); // Musik sofort abspielen, wenn SoundManager erstellt wird
    }

    playBackgroundMusic() {
        this.bgMusic.play()
    }

    setVolume(sound) {
        if (sound === 'off') {
            this.bgMusic.volume = 0;
        } else if (sound === 'low') {
            this.bgMusic.volume = 0.3; // Leise
        } else if (sound === 'high') {
            this.bgMusic.volume = 1.0; // Laut
        }
    }

    updateVolumeButton() {
        document.getElementById('button-volume-up').style.display = 'none';
        document.getElementById('button-volume-down').style.display = 'none';
        document.getElementById('button-volume-off').style.display = 'none';

        if (this.currentVolumeState === 0) {
            document.getElementById('button-volume-off').style.display = 'block';
        } else if (this.currentVolumeState === 1) {
            document.getElementById('button-volume-down').style.display = 'block';
        } else {
            document.getElementById('button-volume-up').style.display = 'block';
        }
    }

    addVolumeButtonListeners() {
        document.getElementById('button-volume-off').addEventListener('click', () => {
            this.changeVolumeState();
        });
        document.getElementById('button-volume-down').addEventListener('click', () => {
            this.changeVolumeState();
        });
        document.getElementById('button-volume-up').addEventListener('click', () => {
            this.changeVolumeState();
        });
    }

    changeVolumeState() {
        this.currentVolumeState = (this.currentVolumeState + 1) % 3;
        this.setVolume(this.volumeStates[this.currentVolumeState]);
        this.updateVolumeButton();
    }
}