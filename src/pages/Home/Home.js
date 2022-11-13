import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";

import styles from "./Home.module.css";

const { Sider, Content } = Layout;

const menuItems = [
  {
    key: "home",
    path: "/",
    label: "Home",
  },
  {
    key: "test",
    path: "/test/PuppedToy",
    label: "Test",
  },
];

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
    const item = menuItems.find((menuItem) => menuItem.path === path);
    if (item) {
      setSelectedKey(item.key);
    }
  }, [location]);

  const onMenuClick = (item) => {
    const foundItem = menuItems.find((i) => i.key === item.key);
    navigate(foundItem?.path || `/${item.key}`);
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
