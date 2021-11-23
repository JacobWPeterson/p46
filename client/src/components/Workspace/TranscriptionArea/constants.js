import pluralize from 'pluralize';

export const shortMessage = (number) => `Your answer is ${pluralize('letter', number, true)} too short.`;

export const longMessage = (number) => `Your answer is ${pluralize('letter', number, true)} too long.`;
