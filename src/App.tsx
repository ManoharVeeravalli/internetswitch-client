import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './routes/Root';
import Login from './routes/Login';
import Signup from './routes/Signup';

import './App.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
