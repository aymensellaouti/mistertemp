import { ValidationArguments } from 'class-validator';

export const ERROR_MESSAGES = {
  taille: (isMin = true) => {
    return (validationArgs: ValidationArguments) => {
      const tailleMessage = isMin
        ? 'la taille minimale est :'
        : 'la taille maximale est';
      return `La taille du champ ${validationArgs.property} est inadéquate, ${tailleMessage} ${validationArgs.constraints[0]} `;
    };
  },
};
