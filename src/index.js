import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KingslayerNewGame from "./pages/Kingslayer/NewGame";
import KingslayerRooms from "./pages/Kingslayer/Rooms";
import KingslayerCrew from "./pages/Kingslayer/Crew";
import KingslayerPerks from "./pages/Kingslayer/Perks";
import KingslayerNeeds from "./pages/Kingslayer/Needs";
import KingslayerFortresses from "./pages/Kingslayer/Fortresses";
import Test from "./pages/Test";
import "antd/dist/antd.dark.min.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/kingslayer/new-game",
        element: <KingslayerNewGame />,
      },
      {
        path: "/kingslayer/rooms",
        element: <KingslayerRooms />,
      },
      {
        path: "/kingslayer/crew",
        element: <KingslayerCrew />,
      },
      {
        path: "/kingslayer/perks",
        element: <KingslayerPerks />,
      },
      {
        path: "/kingslayer/needs",
        element: <KingslayerNeeds />,
      },
      {
        path: "/kingslayer/fortresses",
        element: <KingslayerFortresses />,
      },
      {
        path: "/test/:userId",
        element: <Test />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
