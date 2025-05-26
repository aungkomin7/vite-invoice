import { closeSideBarBtnHandler, manageInventoryBtnHandler } from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler, recordGroupHandler } from "./record";
import {
  addNewProductBtn,
  closeSideBarBtn,
  createRecordForm,
  manageInventoryBtn,
  recordGroup,
} from "./selectors";

const listener = () => {
  manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
  closeSideBarBtn.addEventListener("click", closeSideBarBtnHandler);
  addNewProductBtn.addEventListener("click", addNewProductBtnHandler);
  createRecordForm.addEventListener("submit", createRecordFormHandler);
  recordGroup.addEventListener("click", recordGroupHandler);
};

export default listener;
