import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "../Routes/PublicRoutes";
import { UserContext } from "./contexts/AuthContext";
import PrivateRouteAccess from "../Routes/PrivateRouteAccess";
import { PrivateRoutes } from "../Routes/PrivateRoutes";
import { store } from "./app/store";
import { Provider } from "react-redux";
import CustomerPublicRoutes from "../Routes/CustomerPublicRoutes";

import AuthServices from "./Pages/AuthServices";

function App() {
  const [user, setUser] = useState({ isConnected: false, data: null });

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Provider store={store}>
            <ToastContainer />
            <Routes>
              <Route element={<PrivateRouteAccess />}>
                {PrivateRoutes.map(({ id, path, element }) => (
                  <Route key={id} element={element} path={path}></Route>
                ))}
              </Route>
              <Route element={<CustomerPublicRoutes />}>
                {PublicRoutes.map(({ id, path, element }) => (
                  <Route key={id} element={element} path={path}></Route>
                ))}
              </Route>
              <Route key={0} element={<AuthServices />} path="/"></Route>
            </Routes>
          </Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
