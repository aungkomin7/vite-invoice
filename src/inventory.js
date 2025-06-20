import {
  newProductName,
  newProductPrice,
  productCardTemplate,
  productGroup,
  productSelect,
} from "./selectors";

import { v4 as uuidv4 } from "uuid";
import { products } from "./state";

export const addNewProductBtnHandler = () => {
  const createId = uuidv4();
  productGroup.append(
    createProductCard(
      createId,
      newProductName.value,
      newProductPrice.valueAsNumber
    )
  );
  productSelect.append(new Option(`${newProductName.value} - ${newProductPrice.valueAsNumber}`, createId));

  products.push({
    id: createId,
    name: newProductName.value,
    price: newProductPrice.valueAsNumber,
  });

  newProductName.value = null;
  newProductPrice.value = null;
  newProductName.focus();
};

export const createProductCard = (id, name, price) => {
  const productCard = productCardTemplate.content.cloneNode(true);
  const productName = productCard.querySelector(".product-name");
  const productPrice = productCard.querySelector(".product-price");
  const currentProductCard = productCard.querySelector(".product-card");

  currentProductCard.id = id;
  productName.innerText = name;
  productPrice.innerText = price;

  return productCard;
};

export const productRender = (products) => {
  products.forEach(({ id, name, price }) => {
    productGroup.append(createProductCard(id, name, price));
    productSelect.append(new Option(`${name} - ${price}`, id));
  });
};
