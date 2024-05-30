import React, { useState } from "react";
import "./App.css";
import rock from "./images/rock.png";
import paper from "./images/paper.png";
import scissors from "./images/scissors.png";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const choices = [
    { name: "rock", image: rock },
    { name: "paper", image: paper },
    { name: "scissors", image: scissors },
  ];

  const handleClick = (choice) => {
    setPlayerChoice(choice);
    setIsSpinning(true);
    setComputerChoice(null);
    setWinner(null);

    let index = 0;
    const spinInterval = setInterval(() => {
      setCurrentImage(choices[index].image);
      index = (index + 1) % choices.length;
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      setIsSpinning(false);
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(randomChoice);
      setCurrentImage(randomChoice.image);
      determineWinner(choice, randomChoice);
    }, 3000);
  };

  const determineWinner = (playerChoice, computerChoice) => {
    let newScore = score;
    if (playerChoice.name === computerChoice.name) {
      setWinner("Berabere!");
    } else if (
      (playerChoice.name === "rock" && computerChoice.name === "scissors") ||
      (playerChoice.name === "paper" && computerChoice.name === "rock") ||
      (playerChoice.name === "scissors" && computerChoice.name === "paper")
    ) {
      setWinner("Sen kazandın!");
      newScore += 1;
    } else {
      setWinner("Bilgisayar kazandı!");
      newScore -= 1;
    }

    setScore(newScore);

    if (newScore === 3) {
      setGameOver(true);
    } else if (newScore === -3) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setWinner(null);
    setCurrentImage(null);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="contain w-full h-screen">
      <div className="flex justify-center">
        <h1 className="mt-10 font-semibold text-3xl">Taş Kağıt Makas Oyunu</h1>
      </div>
      <div className="grid grid-cols-3 mt-5 xl:w-9/12 m-auto">
        {choices.map((choice, ix) => (
          <div key={ix} className="flex justify-center p-3 lg:p-0">
            <button
              onClick={() => handleClick(choice)}
              className={`btn rounded-circle max-w-96 ${
                playerChoice?.name === choice.name ? "border-gray-900 border-2" : ""
              }`}
              disabled={isSpinning || gameOver}
            >
              <img src={choice.image} alt={choice.name} />
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 mt-5 xl:w-6/12 m-auto">
        <div className="flex justify-center p-3 lg:p-0"></div>
        <div className="flex justify-center items-center p-3 lg:p-0">
          {!currentImage ? (
            <h1 className="flex items-center justify-center border border-slate-600 font-bold text-8xl rounded-circle min-w-full aspect-square">
              ?
            </h1>
          ) : (
            <img src={currentImage} alt="" />
          )}
        </div>
        <div className="flex justify-center p-3 lg:p-0"></div>
      </div>
      <div className="flex justify-center mt-2">
        <h1 className="font-bold text-4xl">{winner}</h1>
      </div>
      <div className="flex justify-center mt-2">
        <h2 className="font-bold text-2xl">Skor: {score}</h2>
      </div>
      <div className="flex justify-center mt-2">
        {gameOver && (
          <button onClick={resetGame} className="btn bg-blue-500 text-white p-2 rounded">
            Oyunu Yeniden Başlat
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
