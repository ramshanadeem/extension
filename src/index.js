import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// import reducers from './redux/reducers';
import App from "./views/Popup/App";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./Redux/store";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);
