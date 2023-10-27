import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Notfound from "./components/Notfound/Notfound";
import Home from "./components/Home/Home";

import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
//mport SignUpVerification from './components/SignUpVerification/SignUpVerification';
import KanbanBoard from "./components/DnDkit-Board/KanbanBoard.tsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        // { path: 'user/verify/:token', element: <SignUpVerification /> },
        {
          path: "board",
          element: (
            <ProtectedRoutes>
              <KanbanBoard />
            </ProtectedRoutes>
          ),
        },

        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        // {
        //   path: "message/:userId",
        //   element: <SendMessage />,
        // },

        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
