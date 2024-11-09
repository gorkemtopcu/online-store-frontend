import { faker } from "@faker-js/faker";
import categories from "../product/categories";

const getRandomCategory = () => {
  const mainCategory = categories[Math.floor(Math.random() * categories.length)];
  
  const subCategory = mainCategory.subcategories[Math.floor(Math.random() * mainCategory.subcategories.length)];
  
  return { mainCategory: mainCategory.name, subCategory };
};


const generateRandomProduct = (id) => {
  const { mainCategory, subCategory } = getRandomCategory();

  return {
    id,
    brand: faker.company.name(),
    name: faker.commerce.productName(),
    image: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 200, dec: 2 })),
    stock: faker.number.int({ min: 0, max: 100 }),
    popularity: faker.number.int({ min: 1, max: 100 }),
    warrantyStatus: faker.datatype.boolean() ? "Under Warranty" : "No Warranty",
    category: `${mainCategory} - ${subCategory}` // "MainCategory - SubCategory" formatında
  };
};

const generateProducts = (count) => {
  return Array.from({ length: count }, (_, id) => generateRandomProduct(id + 1));
};

export const productMockService = {
  generateProducts,
};