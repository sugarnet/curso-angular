function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiply(first: number, second?: number, base: number = 2) {
  return first * base;
}

const addNumbersArrow = (a: number, b: number): string => {
  return `${a + b}`;
};

interface Character {
  name: string;
  hp: number;
  showHp: () => void;
}

const strider: Character = {
  name: "Strider",
  hp: 50,
  showHp() {
    console.log(`Puntos de vida ${this.hp}`);
  },
};

const healCharacter = (character: Character, amount: number) => {
  character.hp += amount;
};

// const result = addNumbers(1, 2);
// const result2 = addNumbersArrow(1, 2);
// const result3 = multiply(5);

// console.log({ result, result2, result3 });

healCharacter(strider, 10);
healCharacter(strider, 20);
strider.showHp();
