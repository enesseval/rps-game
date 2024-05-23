import React, { useEffect, useState } from "react";

import "./App.css";
import rock from "./images/rock.png";
import paper from "./images/paper.png";
import scissors from "./images/scissors.png";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null)

  const choices = [
    { name: "rock", image: rock },
    { name: "paper", image: paper },
    { name: "scissors", image: scissors },
  ];

  const selectWinner = (choice) => {
    console.log("choicename",choice.name);
    console.log("playerchoice",playerChoice);
    console.log("computerchoice",computerChoice?.name);

    if(playerChoice === computerChoice.name){
      setWinner("It's a Tie..!")
    }else if(
      (playerChoice.name === "rock" && computerChoice.name === "scissors") ||
      (playerChoice.name === "paper" && computerChoice.name === "rock") ||
      (playerChoice.name === "scissors" && computerChoice.name === "paper")
    ){
      setWinner("Computer wins!");
    } else {
      setWinner("You win!");
    }
  }

  const handleClick = (choice) => {
    setIsSpinning(true);
    setPlayerChoice(choice)
  };

  useEffect(() => {
    let interval;
    if (isSpinning) {
      let index = 0;
      interval = setInterval(() => {
        setCurrentImage(choices[index].image);
        index = (index + 1) % choices.length;
      }, 100); // 100ms aralıklarla resimleri değiştir
    }

    return () => clearInterval(interval);
  }, [isSpinning]);

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsSpinning(false);
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(randomChoice);
        setCurrentImage(randomChoice.image);
        selectWinner(randomChoice)
      }, 3000); // 3 saniye sonra durdur

      return () => clearTimeout(timer);
    }
  }, [isSpinning, playerChoice]);

  return (
    <div className="contain w-full h-screen">
      <div className="flex justify-center">
        <h1 className="mt-10 font-semibold text-3xl">
          Rock Paper Scissors Game
        </h1>
      </div>
      <div className="grid grid-cols-3 mt-5  xl:w-9/12 m-auto">
        {choices.map((choice) => (
          <div className="flex justify-center p-3 lg:p-0">
            <button
              onClick={() => {
                handleClick(choice.name);
              }}
              className="btn rounded-circle max-w-96"
            >
              <img src={choice.image} alt={choice.name} />
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 mt-5  xl:w-6/12 m-auto">
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
      <div className="flex justify-center"></div>
      <div className="flex justify-center mt-5">
        <h1 className="font-bold text-4xl">{winner}</h1>
      </div>
    </div>
  );
}

export default App;
