function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "NewProperty";
    hello = "override";
  };
}

@classDecorator
class SuperClass {
  public myProperty: string = "ABC123";

  print() {
    console.log("Hola!!!");
  }
}

console.log(SuperClass);

const myClass = new SuperClass();
console.log(myClass);
