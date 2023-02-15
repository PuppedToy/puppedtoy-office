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
    key: "chat",
    path: "/chat",
    label: "Chat",
  },
  {
    key: "users",
    path: "/users",
    scopes: ["admin"],
    label: "Users",
  },
  {
    key: "kingslayer",
    label: "Kingslayer",
    scopes: ["admin"],
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
    scopes: ["admin"],
    label: "Test",
  },
  {
    key: "graph-playground",
    path: "/graph-playground",
    scopes: ["admin"],
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

function deepFilterMenuItems(items, scopes) {
  if (scopes.includes("owner")) {
    return items;
  }
  return items
    .filter((item) => {
      if (!item.scopes) {
        return true;
      }
      return item.scopes.some((scope) => scopes.includes(scope));
    })
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: deepFilterMenuItems(item.children, scopes),
        };
      }
      return item;
    });
}

export default function NavBar({ selectedKey, onMenuClick }) {
  const scopes = localStorage.getItem("scopes")?.split(",") || [];

  return (
    <Menu
      onClick={onMenuClick}
      theme="dark"
      mode="inline"
      items={deepFilterMenuItems(menuItems, scopes)}
      selectedKeys={[selectedKey]}
    />
  );
}

NavBar.propTypes = {
  selectedKey: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};
