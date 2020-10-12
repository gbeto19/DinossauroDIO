
//  JS 
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            
            //DESCENDO
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }else {

            //SUBINDO
        position += 20;
        dino.syle.bottom = position + 'px';
        }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPiosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPiosition + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPiosition < -60) {

            //SAIU DA TELA
            clearInterval(leftTimer);
            background.removeChild(cactus);

        } else if (cactusPiosition > 0 && cactusPiosition < 60 && position < 60) {

            //GAME OVER
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over"> FIM DO JOGO</H1>';
        } else {
            cactusPiosition -= 10;
            cactus.style.left = cactusPiosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);

}

createCactus();
document.addEventListener('keyup', handleKeyUp);
