const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset');
const newGameBtn = document.querySelector('#new-btn');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    box.innerText = turnO ? 'O' : 'X';
    box.style.color = turnO ? '#388e3c' : '#1a237e';
    box.disabled = true;
    checkWinner();
    turnO = !turnO;
  });
});

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove('highlight');
  });
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 ${winner} Wins!`;
  msgContainer.classList.remove('hide');
  pattern.forEach(index => boxes[index].classList.add('highlight'));
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return;
    }
  }

  const draw = [...boxes].every(box => box.innerText !== "");
  if (draw) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove('hide');
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add('hide');
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
