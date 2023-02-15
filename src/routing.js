import React from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Users from "./pages/Users";
import KingslayerNewGame from "./pages/Kingslayer/NewGame";
import KingslayerPlayground from "./pages/Kingslayer/Playground";
import KingslayerRooms from "./pages/Kingslayer/Rooms";
import KingslayerCrew from "./pages/Kingslayer/Crew";
import KingslayerTraits from "./pages/Kingslayer/Traits";
import KingslayerStats from "./pages/Kingslayer/Stats";
import KingslayerNeeds from "./pages/Kingslayer/Needs";
import KingslayerItems from "./pages/Kingslayer/Items";
import KingslayerFortresses from "./pages/Kingslayer/Fortresses";
import KingslayerFortressRooms from "./pages/Kingslayer/FortressRooms";
import Test from "./pages/Test";
import GraphPlayground from "./pages/GraphPlayground";

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
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/kingslayer/new-game",
        element: <KingslayerNewGame />,
      },
      {
        path: "/kingslayer/playground",
        element: <KingslayerPlayground />,
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
        path: "/kingslayer/traits",
        element: <KingslayerTraits />,
      },
      {
        path: "/kingslayer/stats",
        element: <KingslayerStats />,
      },
      {
        path: "/kingslayer/needs",
        element: <KingslayerNeeds />,
      },
      {
        path: "/kingslayer/items",
        element: <KingslayerItems />,
      },
      {
        path: "/kingslayer/fortresses",
        element: <KingslayerFortresses />,
      },
      {
        path: "/kingslayer/fortress-rooms",
        element: <KingslayerFortressRooms />,
      },
      {
        path: "/test/:userId",
        element: <Test />,
      },
      {
        path: "/graph-playground",
        element: <GraphPlayground />,
      },
    ],
  },
];
