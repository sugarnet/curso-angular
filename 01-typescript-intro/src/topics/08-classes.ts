export class Person {
  //   public name: string;
  //   private address: string;

  constructor(
    public firstName: string,
    public lastName: string,
    private address: string = "No Address"
  ) {}
}

// export class Hero extends Person {
//   constructor(
//     public alterEgo: string,
//     public age: number,
//     public realName: string
//   ) {
//     super(realName, "Gótica");
//   }
// }
export class Hero {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
    public person: Person
  ) {}
}

const bruce = new Person("Bruce", "Wayne", "Gótica");

const batman = new Hero("Batman", 43, "Bruce", bruce);

console.log(batman);
