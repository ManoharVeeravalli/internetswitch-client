import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Devices from './routes/Devices';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Register from "./routes/Register";
import { UserDetailWrapper } from "./lib/hoc";

import './App.css'
import EditDevice from "./routes/EditDevice";


const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/devices",
    element: (
      <UserDetailWrapper>
        <Devices />
      </UserDetailWrapper>
    ),
  },
  {
    path: "/devices/:deviceId",
    element: (
      <UserDetailWrapper>
        <EditDevice/>
      </UserDetailWrapper>
    ),
  },
  {
    path: "/",
    element: <Navigate to={'/devices'} />
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
