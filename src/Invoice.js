import initialRender from "./initialrender";
import listener from "./listener";
import observer from "./observer";

class Invoice {
  init() {
    observer();
    initialRender();
    listener();
  }
}

export default Invoice;
