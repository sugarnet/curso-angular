export interface Product {
  description: string;
  price: number;
}

// const phone: Product = {
//   description: "Nokia 1100",
//   price: 150.0,
// };

// const tablet: Product = {
//   description: 'Samsung 8"',
//   price: 200.0,
// };

export interface TaxCalculationsOptions {
  tax: number;
  products: Product[];
}

// function taxCalculation(options: TaxCalculationsOptions): [number, number] {
// function taxCalculation({
//   tax,
//   products,
// }: TaxCalculationsOptions): [number, number] {
export function taxCalculation(
  options: TaxCalculationsOptions
): [number, number] {
  let total = 0;

  const { products, tax } = options;

  products.forEach(({ price }) => {
    total += price;
  });

  return [total, total * tax];
}

// const shoppingCart = [phone, tablet];
// const tax = 0.21;

// const [total, taxResult] = taxCalculation({
//   products: shoppingCart,
//   tax: tax,
// });

// console.log("Total: ", total);
// console.log("Tax: ", taxResult);
