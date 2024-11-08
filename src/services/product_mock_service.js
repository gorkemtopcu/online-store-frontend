import { faker } from "@faker-js/faker";

const generateRandomProduct = (id) => ({
  id,
  brand: faker.company.name(),
  name: faker.commerce.productName(),
  image: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price({ min: 10, max: 200, dec: 2 })),
  stock: faker.number.int({ min: 0, max: 100 }),
  popularity: faker.number.int({ min: 1, max: 100 }), // New field for popularity
  warrantyStatus: faker.datatype.boolean() ? "Under Warranty" : "No Warranty" // New field for warranty status
});

const generateProducts = (count) => {
  return Array.from({ length: count }, (_, id) => generateRandomProduct(id + 1));
};

export const productMockService = {
  generateProducts,
};
