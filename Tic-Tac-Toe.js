document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".container div");
  let currentPlayer = "X"; // User starts

  // Scores
  let userScore = 0;
  let systemScore = 0;
  let drawScore = 0;

  // Load sounds
  const clickSound = new Audio("Audios/click.mp3");
  const winSound = new Audio("Audios/win.mp3");
  const loseSound = new Audio("Audios/lose.mp3");
  const drawSound = new Audio("Audios/draw.mp3");

  // Scoreboard elements
  const userScoreEl = document.getElementById("user-score");
  const systemScoreEl = document.getElementById("system-score");
  const drawScoreEl = document.getElementById("draw-score");

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.textContent !== "") return;

      // User move
      cell.textContent = "X";
      cell.classList.add("marked");
      clickSound.currentTime = 0;
      clickSound.play();

      if (checkWin("X")) {
        userScore++;
        updateScoreboard();
        winSound.play();
        alert("You Win!");
        startNewRound();
        return;
      }

      if (isDraw()) {
        drawScore++;
        updateScoreboard();
        drawSound.play();
        alert("It's a Draw!");
        startNewRound();
        return;
      }

      // System move after delay
      setTimeout(systemMove, 500);
    });
  });

  function systemMove() {
    const emptyCells = Array.from(cells).filter(cell => cell.textContent === "");
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = "O";
    randomCell.style.color = "brown";
    randomCell.classList.add("marked");

    clickSound.currentTime = 0;
    clickSound.play();

    if (checkWin("O")) {
      systemScore++;
      updateScoreboard();
      loseSound.play();
      alert("System Wins!");
      startNewRound();
    } else if (isDraw()) {
      drawScore++;
      updateScoreboard();
      drawSound.play();
      alert("It's a Draw!");
      startNewRound();
    }
  }

  function checkWin(player) {
    const combos = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];
    return combos.some(combo =>
      combo.every(index => cells[index].textContent === player)
    );
  }

  function isDraw() {
    return Array.from(cells).every(cell => cell.textContent !== "");
  }

  function updateScoreboard() {
    userScoreEl.textContent = userScore;
    systemScoreEl.textContent = systemScore;
    drawScoreEl.textContent = drawScore;
  }

  function startNewRound() {
    setTimeout(() => {
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("marked");
        cell.style.color = "";
      });
    }, 800); // Wait 0.8 sec before starting a new round
  }
});
