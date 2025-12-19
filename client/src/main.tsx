import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store"; // Đảm bảo import store từ đúng đường dẫn

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    {" "}
    {/* Bọc ứng dụng trong Provider */}
    <App />
  </Provider>
);
