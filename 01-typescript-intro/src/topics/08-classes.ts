export class Person {
  //   public name: string;
  //   private address: string;

  constructor(public name: string, private address: string = "No Address") {}
}

export class Hero extends Person {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string
  ) {
    super(realName, "Gótica");
  }
}

const batman = new Hero("Batman", 43, "Bruce");

console.log(batman);
