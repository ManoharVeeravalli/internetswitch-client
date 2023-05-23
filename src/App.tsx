import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './routes/Root';
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Register from "./routes/Register";
import { UserDetailWrapper } from "./lib/hoc";

import './App.css'


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
    path: "/",
    element: <UserDetailWrapper>
      <Root />
    </UserDetailWrapper>,
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
