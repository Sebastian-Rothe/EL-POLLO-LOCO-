class ScreenManager {
    constructor(canvas, ctx, startGameCallback, restartGameCallback) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.startGameCallback = startGameCallback;
        this.restartGameCallback = restartGameCallback;
        this.currentScreen = null;
        this.currentButtons = []; // Array für aktuelle Buttons
    }

    showStartScreen() {
        this.currentScreen = 'start';
        this.clearScreen();
        this.drawImage('./img/9_intro_outro_screens/start/startscreen_1.png');
        
        // Start-Button
        this.createButton('Start Game', () => {
            this.removeCurrentButtons();
            this.startGameCallback();
        }, 'start'); 

        // Anweisungs-Button
        this.createButton('Instructions', () => {
            this.removeCurrentButtons();
            this.showInstructions();
        }, 'instructions'); 

        // Impressum-Button
        this.createButton('Impressum', () => {
            this.removeCurrentButtons();
            this.showImpressum();
        }, 'impressum'); 
    }

    showInstructions() {
        this.clearScreen(); 
        const instructionsContent = document.createElement('div');
        instructionsContent.classList.add('impressum-content');
        instructionsContent.innerHTML = `
            <span class="impressum-headline">Instructions</span>
            <p>Move Left: Arrow Left (←) or A</p>
            <p>Move Right: Arrow Right (→) or D</p>
            <p>Jump: Spacebar</p>
            <p>Throw: R</p> 
        `;
        const goBackButton = document.createElement('button');
        goBackButton.innerText = 'Go Back';
        goBackButton.classList.add('start-button');
        goBackButton.onclick = () => {
            instructionsContent.remove(); 
            goBackButton.remove(); 
            this.showStartScreen(); 
        };
    
        document.getElementById('fullscreen').appendChild(instructionsContent);
        document.getElementById('fullscreen').appendChild(goBackButton);
    }
    

    // showImpressum() {
    //     this.clearScreen(); 
    //     const impressumContent = document.createElement('div');
    //     impressumContent.classList.add('impressum-content');
    //     impressumContent.innerHTML = `
    //         <span class="impressum-headline">Impressum</span>
    //         <span>Sebastian Rothe</span>
    //         <span>Mühlwehrstraße, 8</span>
    //         <span>70488 Frankfurt Am Main</span>
    //         <br>
    //         <span>Kontakt</span>
    //         <span>Telefon: 0176 52968778</span>
    //         <span>E-Mail: sebi1995@gmx.at</span>
    //         <br>
    //         <span> Erstellt von impressum-generator.info - powered by abfindungshero.de </span>
    //         <span>Angaben gemäß Par. 5 DDG</span>
    //     `;
    //     const goBackButton = document.createElement('button');
    //     goBackButton.innerText = 'Go Back';
    //     goBackButton.classList.add('start-button');
    //     goBackButton.onclick = () => {
    //         impressumContent.remove();
    //         goBackButton.remove(); 
    //         this.showStartScreen(); 
    //     };

    //     document.getElementById('fullscreen').appendChild(impressumContent);
    //     document.getElementById('fullscreen').appendChild(goBackButton);
    // }
    showImpressum() {
        this.clearScreen(); 
    
        document.getElementById('button-volume-up').style.display = 'none';
        document.getElementById('button-volume-down').style.display = 'none';
        document.getElementById('button-volume-off').style.display = 'none';
    
        const impressumContent = document.createElement('div');
        impressumContent.classList.add('impressum-content');
        impressumContent.innerHTML = `
            <span class="impressum-headline">Impressum</span>
            <span>Sebastian Rothe</span>
            <span>Mühlwehrstraße, 8</span>
            <span>70488 Frankfurt Am Main</span>
            <br>
            <span>Kontakt</span>
            <span>Telefon: 0176 52968778</span>
            <span>E-Mail: sebi1995@gmx.at</span>
            <br>
            <span> Erstellt von impressum-generator.info - powered by abfindungshero.de </span>
            <span>Angaben gemäß Par. 5 DDG</span>
        `;
    
        const goBackButton = document.createElement('button');
        goBackButton.innerText = 'Go Back';
        goBackButton.classList.add('start-button');
        goBackButton.onclick = () => {
            impressumContent.remove();
            goBackButton.remove(); 
            this.showStartScreen(); 
            document.getElementById('button-volume-off').style.display = 'block';
            this.soundManager.updateVolumeButton(); 
        };
        document.getElementById('fullscreen').appendChild(impressumContent);
        document.getElementById('fullscreen').appendChild(goBackButton);
    }
    
    
    showGameOverScreen() {
        this.currentScreen = 'gameOver';
        this.clearScreen();
        this.drawImage('./img/9_intro_outro_screens/game_over/oh no you lost!.png');
        this.createButton('Play Again', () => {
            this.removeCurrentButtons();
            this.restartGameCallback();
        }, 'playAgain'); 
    }

    showWinScreen() {
        this.currentScreen = 'win';
        this.clearScreen();
        this.drawImage('./img/9_intro_outro_screens/win/win_2.png');
        this.createButton('Play Again', () => {
            this.removeCurrentButtons();
            this.restartGameCallback();
        }, 'playAgain'); 
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.removeCurrentButtons();
    }

    drawImage(imagePath) {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
    }

    createButton(text, callback, type) {
        const button = document.createElement('button');
        button.innerText = text;
        button.onclick = callback;
        
        if (type === 'start' || type === 'playAgain') {
            button.classList.add('start-button');
        } else if (type === 'instructions') {
            button.classList.add('button-start-screen'); 
           
            button.classList.add('instructions'); 
        } else if (type === 'impressum') {
            button.classList.add('button-start-screen'); 
            button.classList.add('impressum'); 
        }

        document.getElementById('fullscreen').appendChild(button);
        this.currentButtons.push(button);
    }
    removeCurrentButtons() {
        this.currentButtons.forEach(button => button.remove());
        this.currentButtons = [];
    }
}
