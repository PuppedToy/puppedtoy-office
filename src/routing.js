import React from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import KingslayerNewGame from "./pages/Kingslayer/NewGame";
import KingslayerRooms from "./pages/Kingslayer/Rooms";
import KingslayerCrew from "./pages/Kingslayer/Crew";
import KingslayerPerks from "./pages/Kingslayer/Perks";
import KingslayerNeeds from "./pages/Kingslayer/Needs";
import KingslayerFortresses from "./pages/Kingslayer/Fortresses";
import Test from "./pages/Test";

export default [
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
];
