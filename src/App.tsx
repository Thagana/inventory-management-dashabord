import { ConfigProvider } from "antd";
import "./App.css";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";

function App() {
  return (
    <StoreProvider store={store}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#7303fc",
            borderRadius: 2,

            // Alias Token
            colorBgContainer: "#ffffff",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </StoreProvider>
  );
}
export default App;
