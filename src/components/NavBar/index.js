import React from "react";
import PropTypes from "prop-types";

import { Menu } from "antd";

export const menuItems = [
  {
    key: "home",
    path: "/",
    label: "Home",
  },
  {
    key: "kingslayer",
    label: "Kingslayer",
    children: [
      {
        key: "new-game",
        label: "New Game",
      },
      {
        key: "playground",
        label: "Playground",
      },
      {
        key: "rooms",
        label: "Rooms",
      },
      {
        key: "crew",
        label: "Crew",
      },
      {
        key: "needs",
        label: "Needs",
      },
      {
        key: "traits",
        label: "Traits",
      },
      {
        key: "stats",
        label: "Stats",
      },
      {
        key: "items",
        label: "Items",
      },
      {
        key: "fortresses",
        label: "Fortresses",
      },
      {
        key: "fortress-rooms",
        label: "Fortress Rooms",
      },
    ],
  },
  {
    key: "test",
    path: "/test/PuppedToy",
    label: "Test",
  },
  {
    key: "graph-playground",
    path: "/graph-playground",
    label: "Graph Playground",
  },
];

const itemMapper =
  (parent = "") =>
  (item) => ({
    ...item,
    path: item.path || `${parent ? `/${parent}` : ""}/${item.key}`,
  });

export const pathItems = menuItems
  .filter((item) => !item.children)
  .map(itemMapper())
  .concat(
    menuItems
      .filter((item) => item.children)
      .map((item) => item.children.map(itemMapper(item.key)))
      .flat()
  );

export default function NavBar({ selectedKey, onMenuClick }) {
  return (
    <Menu
      onClick={onMenuClick}
      theme="dark"
      mode="inline"
      items={menuItems}
      selectedKeys={[selectedKey]}
    />
  );
}

NavBar.propTypes = {
  selectedKey: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};
