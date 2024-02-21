import Data from "./json-files/yearbook.json";

export const test = () => {
  return true;
};

export type slotData = {
  name: string;
  bonus: number;
  characters: number;
  boost: number;
  value: number;
};
export type yearbook = {
  slot1: {
    name: string;
    bonus: number;
    characters: number;
    boost: number;
    value: number;
  }[];

  slot2: {
    name: string;
    bonus: number;
    characters: number;
    boost: number;
    value: number;
  }[];

  slot3: {
    name: string;
    bonus: number;
    characters: number;
    boost: number;
    value: number;
  }[];

  slot4: {
    name: string;
    bonus: number;
    characters: number;
    boost: number;
    value: number;
  }[];

  slot5: {
    name: string;
    bonus: number;
    characters: number;
    boost: number;
    value: number;
  }[];
};

const parse = (
  slot: {
    name: string;
    bonus: string;
    characters: string;
    boost: string;
    value: string;
  }[]
) => {
  return slot.map((item) => {
    return {
      name: item.name,
      bonus: parseFloat(item.bonus.toString().replace(",", ".")),
      characters: parseFloat(item.characters.toString().replace(",", ".")),
      boost: parseFloat(item.boost.toString().replace(",", ".")),
      value: parseFloat(item.value.toString().replace(",", ".")),
    };
  });
};

export const getData = (): yearbook => {
  return {
    slot1: parse(Data.slot1),
    slot2: parse(Data.slot2),
    slot3: parse(Data.slot3),
    slot4: parse(Data.slot4),
    slot5: parse(Data.slot5),
  };
};

export const findCombo = (
  minTotal: number,
  maxTotal: number,
  indexes: number[]
): [number[], number, number] => {
  let newIndexes: number[] = indexes;
  let data = getData();
  let stop = 10000;
  let iterations = 0;
  let sum: number = 0;

  while (iterations < stop) {
    //add +1 to index
    if (sum >= minTotal && sum <= maxTotal) {
      return [newIndexes, iterations, sum];
    } else {
      indexes[0] === data.slot1.length - 1
        ? (newIndexes[0] = 0)
        : (newIndexes[0] = newIndexes[0] + 1);
      indexes[1] === data.slot2.length - 1
        ? (newIndexes[1] = 0)
        : (newIndexes[1] = newIndexes[1] + 1);
      indexes[2] === data.slot3.length - 1
        ? (newIndexes[2] = 0)
        : (newIndexes[2] = newIndexes[2] + 1);
      indexes[3] === data.slot4.length - 1
        ? (newIndexes[3] = 0)
        : (newIndexes[3] = newIndexes[3] + 1);
      indexes[4] === data.slot5.length - 1
        ? (newIndexes[4] = 0)
        : (newIndexes[4] = newIndexes[4] + 1);
    }

    sum = 0;
    //sum all values
    sum += data.slot1[newIndexes[0]].value;
    sum += data.slot2[newIndexes[1]].value;
    sum += data.slot3[newIndexes[2]].value;
    sum += data.slot4[newIndexes[3]].value;
    sum += data.slot5[newIndexes[4]].value;

    iterations++;
  }
  return [indexes, 0, 0];
};

export const calcTotal = (indexes: number[]) => {
  let sum = 0;
  let data = getData();

  sum += data.slot1[indexes[0]].value;
  sum += data.slot2[indexes[1]].value;
  sum += data.slot3[indexes[2]].value;
  sum += data.slot4[indexes[3]].value;
  sum += data.slot5[indexes[4]].value;

  return sum;
};

export const findIndexByName = (item: string): number => {
  let data = getData();

  for (let i = 0; i < data.slot1.length; i++) {
    if (data.slot1[i].name === item) {
      return i;
    }
  }

  for (let i = 0; i < data.slot2.length; i++) {
    if (data.slot2[i].name === item) {
      return i;
    }
  }

  for (let i = 0; i < data.slot3.length; i++) {
    if (data.slot3[i].name === item) {
      return i;
    }
  }

  for (let i = 0; i < data.slot4.length; i++) {
    if (data.slot4[i].name === item) {
      return i;
    }
  }

  for (let i = 0; i < data.slot5.length; i++) {
    if (data.slot5[i].name === item) {
      return i;
    }
  }

  return 0;
};

export const findItemByName = (item: string, indexes: number[]): number => {
  let data = getData();

  const calcDistance = (index: number, startIndex: number, length: number) => {
    if (index > startIndex) {
      return index - startIndex;
    } else if (index < startIndex) {
      return length - startIndex + index;
    }
    return length;
  };

  for (let i = 0; i < data.slot1.length; i++) {
    if (data.slot1[i].name.toLowerCase() === item.toLowerCase()) {
      return calcDistance(i, indexes[0], data.slot1.length);
    }
  }

  for (let i = 0; i < data.slot2.length; i++) {
    if (data.slot2[i].name.toLowerCase() === item.toLowerCase()) {
      return calcDistance(i, indexes[1], data.slot2.length);
    }
  }

  for (let i = 0; i < data.slot3.length; i++) {
    if (data.slot3[i].name.toLowerCase() === item.toLowerCase()) {
      return calcDistance(i, indexes[2], data.slot3.length);
    }
  }

  for (let i = 0; i < data.slot4.length; i++) {
    if (data.slot4[i].name.toLowerCase() === item.toLowerCase()) {
      return calcDistance(i, indexes[3], data.slot4.length);
    }
  }

  for (let i = 0; i < data.slot5.length; i++) {
    if (data.slot5[i].name.toLowerCase() === item.toLowerCase()) {
      return calcDistance(i, indexes[4], data.slot5.length);
    }
  }

  return 0;
};

export const jumpIndexes = (jump: number, indexes: number[]): number[] => {
  let newIndexes: number[] = [];
  let slotSizes = [
    Data.slot1.length,
    Data.slot2.length,
    Data.slot3.length,
    Data.slot4.length,
    Data.slot5.length,
  ];

  indexes.forEach((index) => {
    newIndexes.push(index + jump);
  });

  for (let i = 0; i < 5; i++) {
    while (newIndexes[i] > slotSizes[i] - 1) {
      newIndexes[i] = newIndexes[i] - slotSizes[i];
    }
  }
  return newIndexes;
};
