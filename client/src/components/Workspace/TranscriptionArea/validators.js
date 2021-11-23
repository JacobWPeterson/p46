import { longMessage, shortMessage } from './constants.js';

const evaluateSubmission = (guess, answer, answerLength) => {
  const trimmedGuess = guess.replace(/\s/g, '');
  if (trimmedGuess.length === answerLength) {
    return [trimmedGuess === answer, trimmedGuess === answer ? 'correct' : 'Answer is incorrect.'];
  }
  if (trimmedGuess.length < answerLength) {
    return [false, shortMessage(answerLength - trimmedGuess.length)];
  }
  return [false, longMessage(trimmedGuess.length - answerLength)];
};

export default evaluateSubmission;
