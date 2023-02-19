let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
const generateTarget = () =>
  Math.floor(Math.random() * 10);

const compareGuesses = (
  humanGuess,
  computerGuess,
  targetNumber
) => {
  const humanDif = getAbsoluteDistance(
    humanGuess,
    targetNumber
  );
  const computerDif = getAbsoluteDistance(
    computerGuess,
    targetNumber
  );

  return humanDif <= computerDif;
};

const getAbsoluteDistance = (n1, n2) => Math.abs(n1 - n2);

const updateScore = winner => {
  if (winner === 'human') {
    humanScore++;
  } else if (winner === 'computer') {
    computerScore++;
  }
};

const advanceRound = () => {
  currentRoundNumber++;
};
