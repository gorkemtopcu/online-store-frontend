import { faker } from "@faker-js/faker";

const generateRandomProduct = (id) => ({
  id,
  brand: faker.company.name(),
  name: faker.commerce.productName(),
  image: faker.image.urlPicsumPhotos({width: 400, height: 400}),
  price: faker.commerce.price({ min: 10, max: 200, dec: 2, symbol: "$" }),
  stock: faker.number.int({ min: 0, max: 100 }),
});

const generateProducts = (count) => {
  return Array.from({ length: count }, (_, id) => generateRandomProduct(id + 1));
};

export const productMockService = {
  generateProducts,
};
