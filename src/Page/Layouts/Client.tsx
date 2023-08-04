import React, { useState } from "react";
import { Layout, Space } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  AimOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const { Header, Footer } = Layout;

const items: MenuProps["items"] = [
  {
    label: <Link to={"/"}>Home</Link>,
    icon: <HomeOutlined />,
    key: "1",
  },
  {
    label: <Link to={"/shop"}>Shop</Link>,
    icon: <ShopOutlined />,
    key: "2",
  },
  {
    label: <Link to={"/cart"}>Cart</Link>,
    key: "SubMenu",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: <Link to={"/admin"}></Link>,
    icon: <AimOutlined />,
    key: "5",
  },
];

export const LayoutClient = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <React.Fragment>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header
            style={{
              textAlign: "center",
              color: "#fff",
              paddingInline: 0,
            }}
          >
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
              style={{ width: "100%" }}
            />
          </Header>
          <Layout>
            <Outlet />
          </Layout>
          <Footer
            style={{
              textAlign: "center",
              color: "black",
            }}
          >
            Phan Thanh Dong - dongptph 28020 - edu.fpt.vn{" "}
          </Footer>
        </Layout>
      </Space>
    </React.Fragment>
  );
};
