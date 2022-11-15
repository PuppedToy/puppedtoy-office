import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { logout } from "../../services/api";

import styles from "./Home.module.css";

const { Header, Sider, Content } = Layout;

const menuItems = [
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
        key: "perks",
        label: "Perks",
      },
      {
        key: "fortresses",
        label: "Fortresses",
      },
    ],
  },
  {
    key: "test",
    path: "/test/PuppedToy",
    label: "Test",
  },
];

const itemMapper =
  (parent = "") =>
  (item) => ({
    ...item,
    path: item.path || `${parent ? `/${parent}` : ""}/${item.key}`,
  });

const pathItems = menuItems
  .filter((item) => !item.children)
  .map(itemMapper())
  .concat(
    menuItems
      .filter((item) => item.children)
      .map((item) => item.children.map(itemMapper(item.key)))
      .flat()
  );

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = React.useState("home");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const path = location.pathname;
    const item = pathItems.find((menuItem) => menuItem.path === path);
    if (item) {
      setSelectedKey(item.key);
    }
  }, [location]);

  const onMenuClick = (item) => {
    const foundItem = pathItems.find((i) => i.key === item.key);
    navigate(foundItem?.path || `/${item.key}`);
  };

  const onLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout className={styles.container}>
      <Sider className={styles.sider}>
        <Menu
          onClick={onMenuClick}
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.loginInfo}>
            Logged as {localStorage.getItem("name")}{" "}
            <Button type="link" onClick={onLogoutClick}>
              Logout
            </Button>
          </div>
        </Header>
        <Content>
          <div className={styles.home}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
