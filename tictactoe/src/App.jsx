import { useState } from 'react';
import './App.css';

export default function App() {
  const [account, setAccount] = useState("X");
  const [moves, setMoves] = useState(0);
  const [result, setResult] = useState("");
  const [text, setText ] = useState("");
  const [gameOver, setGameOver] = useState(false); // Add game over state

  const checkWinner = () => {
    const cells = document.getElementsByClassName('cell');
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
        return true;
      }
    }
    return false;
  }

  const handleClick = (cellId) => {
    // If the game is over or the cell is already filled, do nothing
    if (gameOver || document.getElementById(cellId).textContent !== '') {
      setText('Game Over!!! Start a new game...')
      return;
    }

    // Fill the cell with the current player's mark
    document.getElementById(cellId).innerHTML = account;
    setMoves(moves + 1);

    if (checkWinner()) {
      setResult(`${account} wins!`);
      setGameOver(true); // End the game when there's a winner
    } 
    if (moves === 8) {
      setResult('It\'s a draw!');
      setGameOver(true); // End the game if it's a draw
    }

    // Switch players
    setAccount(account === "O" ? "X" : "O");
  }

  const restartGame = () => {
    // Reset the game state and board
    setAccount("X");
    setMoves(0);
    setGameOver(false);
    setText("");
    setResult("");
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
      cell.innerHTML = ''; // Clear all cells
    }
  }

  return (
    <>
      <header>
        <h1 id="heading">Tic Tac Toe</h1>
      </header>
      <section>
        <div>{result}</div>
        <div id='box'>
          <div className="cell" id='cell1' onClick={() => { handleClick('cell1') }} ></div>
          <div className="cell" id='cell2' onClick={() => { handleClick('cell2') }} ></div>
          <div className="cell" id='cell3' onClick={() => { handleClick('cell3') }} ></div>
          <div className="cell" id='cell4' onClick={() => { handleClick('cell4') }} ></div>
          <div className="cell" id='cell5' onClick={() => { handleClick('cell5') }} ></div>
          <div className="cell" id='cell6' onClick={() => { handleClick('cell6') }} ></div>
          <div className="cell" id='cell7' onClick={() => { handleClick('cell7') }} ></div>
          <div className="cell" id='cell8' onClick={() => { handleClick('cell8') }} ></div>
          <div className="cell" id='cell9' onClick={() => { handleClick('cell9') }} ></div>
        </div>
        <div>{text}</div>
        <button onClick={restartGame} id='restart-btn'>Restart</button>
      </section>
    </>
  );
}
