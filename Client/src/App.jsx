import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "../Routes/PublicRoutes";
import { UserContext } from "./contexts/AuthContext";
import PrivateRouteAccess from "../Routes/PrivateRouteAccess";
import { PrivateRoutes } from "../Routes/PrivateRoutes";
import Sidebar from "./scenes/Dashbord/Sidebar";

function App() {
  const [user, setUser] = useState({ isConnected: false, data: null });

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <ToastContainer />
          <Routes>
            <Route element={<PrivateRouteAccess />}>
              {PrivateRoutes.map(({ id, path, element }) => (
                <Route key={id} element={element} path={path}></Route>
              ))}
            </Route>

            {PublicRoutes.map(({ id, path, element }) => (
              <Route key={id} element={element} path={path}></Route>
            ))}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
