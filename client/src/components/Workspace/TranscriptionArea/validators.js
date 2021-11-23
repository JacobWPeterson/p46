import { longMessage, shortMessage } from './constants.js';

const evaluateSubmission = (guess, answer, answerLength) => {
  const reformattedGuess = guess.replace(/\s/g, '').replace(/ς|ϲ/gi, 'σ').toLowerCase();
  if (reformattedGuess.length === answerLength) {
    return [reformattedGuess === answer, reformattedGuess === answer ? 'correct' : 'Answer is incorrect.'];
  }
  if (reformattedGuess.length < answerLength) {
    return [false, shortMessage(answerLength - reformattedGuess.length)];
  }
  return [false, longMessage(reformattedGuess.length - answerLength)];
};

export default evaluateSubmission;
