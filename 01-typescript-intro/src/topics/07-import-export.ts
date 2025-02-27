import {
  Product,
  taxCalculation,
  TaxCalculationsOptions,
} from "./06-function-destructuring";

const shoppingCart: Product[] = [
  {
    description: "Arroz",
    price: 1000,
  },
  {
    description: "Azúar",
    price: 1500,
  },
];

const options: TaxCalculationsOptions = {
  tax: 0.21,
  products: shoppingCart,
};
const [total, tax] = taxCalculation(options);

console.log("Total: ", total);
console.log("Tax: ", tax);
