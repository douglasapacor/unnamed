import { commomNumbers, lowerAlphabet, upperAlphabet } from "./base";

export const generateRandomNumber = (): number => {
  return parseInt(`${Math.random() * (999999 - 1) + 1}`);
};

export const generateRandomRangeNumber = (min: number, max: number): number => {
  return parseInt(`${Math.random() * (max - min) + min}`);
};

export const generateRandomString = (preText?: string): string => {
  return `${preText}${Math.random() * (999999 - 1) + 1}`;
};

export const generateKey = (keySize?: number): string => {
  let newKey = "";
  let rounds = 26;

  if (keySize) rounds = keySize;

  for (let i = 0; i < rounds; i++) {
    const typeCharacter = generateRandomRangeNumber(0, 3);

    if (typeCharacter === 0) {
      const indexCharacters = generateRandomRangeNumber(
        0,
        lowerAlphabet.length
      );
      newKey += lowerAlphabet[indexCharacters];
    }

    if (typeCharacter === 1) {
      const indexCharacters = generateRandomRangeNumber(
        0,
        upperAlphabet.length
      );
      newKey += upperAlphabet[indexCharacters];
    }

    if (typeCharacter === 2) {
      const indexCharacters = generateRandomRangeNumber(
        0,
        commomNumbers.length
      );
      newKey += commomNumbers[indexCharacters];
    }
  }

  return newKey;
};

export const generateUpperRandomString = (keySize?: number): string => {
  let newKey = "";
  let rounds = 26;

  if (keySize) rounds = keySize;

  for (let i = 0; i < rounds; i++) {
    const indexCharacters = generateRandomRangeNumber(0, upperAlphabet.length);
    newKey += upperAlphabet[indexCharacters];
  }

  return newKey;
};

export const generateLowerRandomString = (keySize?: number): string => {
  let newKey = "";
  let rounds = 26;

  if (keySize) rounds = keySize;

  for (let i = 0; i < rounds; i++) {
    const indexCharacters = generateRandomRangeNumber(0, lowerAlphabet.length);
    newKey += lowerAlphabet[indexCharacters];
  }

  return newKey;
};
