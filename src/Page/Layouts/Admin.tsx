import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  DingtalkOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

export const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to={"/admin"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DingtalkOutlined />}>
            <Link to={"/admin/product"}>Products </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ApartmentOutlined />}>
            <Link to={"/admin/category"}>Categories </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            height: "100vh",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
