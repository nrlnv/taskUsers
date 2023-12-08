import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "./app/theme/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={defaultTheme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
