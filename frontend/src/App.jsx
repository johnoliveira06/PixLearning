import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import BancodoBrasil from "./pages/BancodoBrasil";
import Bradesco from "./pages/Bradesco";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/bancodobrasil",
        element: <BancodoBrasil />,
      },
      {
        path: "/bradesco",
        element: <Bradesco />,
      },
    ],
  },
  //   {
  //     path: "/cart",
  //     element: <Cart/>
  //   },
  //   {
  //     path: "/orders",
  //     element: <Orders/>
  //   }
  //   ]
  // },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
