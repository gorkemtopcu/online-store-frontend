// config/CreateProductFormConfig.js
import React from "react";
import ProductCategoryInput from "../components/ProductCategoryInput";
import ProductNameInput from "../components/ProductNameInput";
import AuthorInput from "../components/AuthorInput";
import PublisherInput from "../components/PublisherInput";
import ISBNInput from "../components/ISBNInput";
import LanguageInput from "../components/LanguageInput";
import NumberOfPagesInput from "../components/NumberOfPagesInput";
import PublicationDateInput from "../components/PublicationDateInput";
import EditionInput from "../components/EditionInput";
import ProductDescriptionInput from "../components/ProductDescriptionInput";
import ProductionCostInput from "../components/ProductionCostInput";
import DistributorInformationInput from "../components/DistributorInformationInput";
import StockQuantityInput from "../components/StockQuantityInput";
import SerialNumberInput from "../components/SerialNumberInput";
import WarrantyStatusInput from "../components/WarrantyStatusInput";
import ProductImageUpload from "../components/ProductImageUpload";

const CreateProductFormConfig = [
  {
    components: [<ProductCategoryInput />, <ProductNameInput />],
  },
  {
    components: [<AuthorInput />, <PublisherInput />],
  },
  {
    components: [<ISBNInput />, <LanguageInput />],
  },
  {
    components: [<NumberOfPagesInput />, <PublicationDateInput />],
  },
  {
    components: [<EditionInput />, <ProductionCostInput />],
  },
  {
    components: [<DistributorInformationInput /> , <StockQuantityInput />],
  },
  {
    components: [<SerialNumberInput />, <WarrantyStatusInput />],
  },
  {
    components: [<ProductDescriptionInput />, <ProductImageUpload />],
  },
];

export default CreateProductFormConfig;
