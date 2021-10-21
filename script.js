let secretNumber = Math.trunc(Math.random()*50) + 1;
let score = 10;
let highscore = 0;

const btnCheck = document.querySelector('.check');

const displayMessage = message => document.querySelector('.message').textContent = message;
const displayTemperature = temperature => document.querySelector('.temperature').textContent = temperature;
const changeBodyBackgroundColor = color => document.querySelector('body').style.backgroundColor = color;

const handleCheck = (e) => {
  if (e.type === 'keypress')
    if (!(e.which === 13))
      return;
  

  const guess = Number(document.querySelector('.guess').value);

  if (guess > 50 || guess < 1){
    document.querySelector('.guess').value = '';
    displayMessage('Precisa de um manual?');
  }

  else if (guess === secretNumber){
    gameOver();
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore){
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  else if (guess !== secretNumber){
    if (Math.abs(guess - secretNumber) <= 2){
      changeBodyBackgroundColor('red');
      displayTemperature(`Tá pegango fogo, bicho!`);
    }
    else if (Math.abs(guess - secretNumber) <= 5){
      changeBodyBackgroundColor('darkorange');
      displayTemperature('Muito quente');
    }
    else if (Math.abs(guess - secretNumber) <= 10){
      changeBodyBackgroundColor('orange');
      displayTemperature('Quente');
    }
    else{
      changeBodyBackgroundColor('#222');
    }

    if (score > 1){
      displayMessage(`Muito ${guess > secretNumber ? 'alto' : 'baixo'}`);
      score--;
      document.querySelector('.score').textContent = score;
    }else{
      gameOver();
      document.querySelector('.score').textContent = 0;
    }
  }

};

const gameOver = () => {
  document.querySelector('.guess').removeEventListener('keypress', handleCheck);
  btnCheck.removeEventListener('click', handleCheck);
  btnCheck.style.cursor = 'not-allowed';
  btnCheck.style.opacity = '0.2';

  displayMessage(score > 1 ? 'Número correto!' : 'Perdeste!');
  displayTemperature(score > 1 ? 'Parabéns! Você venceu :)' : '');
  changeBodyBackgroundColor(score > 1 ? '#60b347' : '');

  document.querySelector('.number').textContent = score > 1 ? secretNumber : ':(';
  document.querySelector('.guess').readOnly = 'readonly';
};

const repeat = () => {
  score = 10;
  secretNumber = Math.trunc(Math.random()*50) + 1;

  btnCheck.addEventListener('click', handleCheck);
  document.querySelector('.guess').addEventListener('keypress', handleCheck);
  
  displayMessage('Comece a advinhar...');
  displayTemperature('');
  changeBodyBackgroundColor('#222');
  btnCheck.style.cursor = 'pointer';
  btnCheck.style.opacity = '1';
  document.querySelector('.guess').removeAttribute('readonly');
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = 10;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
};



btnCheck.addEventListener('click', handleCheck);
document.querySelector('.guess').addEventListener('keypress', handleCheck);
document.querySelector('.again').addEventListener('click', repeat);