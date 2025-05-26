import Swal from "sweetalert2";
import {
  createRecordForm,
  recordGroup,
  recordNetTotal,
  recordRemove,
  recordRowTemplate,
  recordTotal,
} from "./selectors";
import { products } from "./state";
import { v4 as uuidv4 } from "uuid";

export const createRecordFormHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(createRecordForm);

  const currentProduct = products.find(
    ({ id }) => id == formData.get("product_select")
  );

  recordGroup.append(createRecordRow(currentProduct, formData.get("quantity")));
  createRecordForm.reset();

  const total = calculateRecordCostTotal();
  const tax = calculateTax(total);

  recordTotal.innerText = total;
  recordTax.innerText = tax;
  recordNetTotal.innerText = total + tax;
};

const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");
  const recordProductPrice = recordRow.querySelector(".record-product-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordCost = recordRow.querySelector(".record-cost");

  const currentRecordRow = recordRow.querySelector(".record-row");
  currentRecordRow.setAttribute("product-id", id);

  currentRecordRow.setAttribute("row-id", uuidv4());

  recordProductName.innerText = name;
  recordProductPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordCost.innerText = price * quantity;
  return recordRow;
};

export const calculateTax = (amount, percentage = 5) => {
  return amount * (percentage / 100);
};

export const calculateRecordCostTotal = () => {
  let total = 0;
  recordGroup.querySelectorAll(".record-cost").forEach((el) => {
    total += parseFloat(el.innerText);
  });

  return total;
};

export const removeRecord = (rowId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const currentRecordRow = document.querySelector(`[row-id = "${rowId}"]`);
      currentRecordRow.remove();
    }
  });
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    removeRecord(currentRecordRow.getAttribute("row-id"));
  }
};

export const recordGroupObserver = () => {
  const updatePriceTotal = () => {
    const total = calculateRecordCostTotal();
    const tax = calculateTax(total);

    recordTotal.innerText = total;
    recordTax.innerText = tax;
    recordNetTotal.innerText = total + tax;
  };
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(updatePriceTotal);
  observer.observe(recordGroup, observerOptions);
};
