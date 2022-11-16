import React from "react";
import { render } from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routing from "./routing";
import "./index.css";
import "antd/dist/antd.dark.min.css";

const router = createBrowserRouter(routing);

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  rootElement
);
