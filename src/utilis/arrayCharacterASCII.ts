export const arrayCharacterASCII = (low: number, high: number) => {
  const array = [];

  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
};
