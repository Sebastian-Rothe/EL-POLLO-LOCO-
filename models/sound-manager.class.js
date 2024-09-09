class SoundManager {
    
    
    sounds = {
        bgMusic: new Audio('audio/background.mp3'),
        characterJump: new Audio ('audio/jump.mp3'),
        characterHurt: new Audio ('audio/hurt.mp3'),
        characterDead: new Audio ('audio/dead.mp3'),
        coinSound: new Audio('audio/coin_picked.mp3'),
        bottlePickSound: new Audio('audio/item_picked.mp3'),
        winSound: new Audio('audio/win.mp3'),
        chickenKilled: new Audio('audio/chicken_killed.mp3')
      
    }
    
    
    constructor() {
        this.bgMusic = new Audio('audio/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.5; 
        this.volumeStates = ['off', 'low', 'high'];
        this.currentVolumeState = 1; 
        this.updateVolumeButton();
        this.addVolumeButtonListeners();
    }

    playSound(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.play();
        } else {
            console.error(`Sound ${soundName} not found!`);
        }
    }

    playBackgroundMusic(){
        this.bgMusic.play();
    }
    setVolume(sound) {
        if (sound === 'off') {
            this.bgMusic.volume = 0;
        } else if (sound === 'low') {
            this.bgMusic.volume = 0.3; 
        } else if (sound === 'high') {
            this.bgMusic.volume = 1.0; 
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