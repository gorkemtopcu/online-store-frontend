import { faker } from "@faker-js/faker";
import categories from "constants/categories";

const generateRandomProduct = (id) => {
  const category = faker.helpers.arrayElement(categories);
  const subcategory = faker.helpers.arrayElement(category.subcategories);

  return {
    id,
    brand: faker.company.name(),
    name: faker.commerce.productName(),
    image: faker.image.urlPicsumPhotos({ width: 512, height: 512 }),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 200, dec: 2 })),
    stock: faker.number.int({ min: 0, max: 100 }),
    popularity: faker.number.int({ min: 1, max: 100 }),
    warrantyStatus: faker.datatype.boolean() ? "Under Warranty" : "No Warranty",
    category: category.name,
    subcategory: subcategory,
  };
};

const generateProducts = (count) => {
  return Array.from({ length: count }, (_, id) =>
    generateRandomProduct(id + 1)
  );
};

export const productMockService = {
  generateProducts,
};
