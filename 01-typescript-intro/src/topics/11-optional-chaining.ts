export interface Passenger {
  name: string;
  children?: string[];
}

const passenger1: Passenger = { name: "Diego" };
const passenger2: Passenger = { name: "Sol", children: ["Alma", "Valen"] };

const printChildren = (passenger: Passenger) => {
  const howManyChildren = passenger.children?.length || 0;
  //   const howManyChildren = passenger.children!.length; // not null assertion operator

  console.log(passenger.name, howManyChildren);
};

printChildren(passenger1);
printChildren(passenger2);
