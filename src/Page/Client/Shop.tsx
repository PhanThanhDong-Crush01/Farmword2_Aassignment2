import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Form, Layout, Menu, Switch, Divider } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  getProducts,
  getProductsCate,
  getProductsSeach,
} from "@/actions/product";
import { getcategories } from "@/actions/categories";
import type { MenuTheme } from "antd/es/menu";
import { IProduct } from "@/interfaces/IProduct";
import { FormSearch } from "@/components/FormSearch";
const { Sider, Content } = Layout;

export const Shop = () => {
  const dispatch = useAppDispatch();
  let { products, isLoading, error } = useAppSelector(
    (state: any) => state.products
  );
  const { categories } = useAppSelector((state: any) => state.categories);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [theme, setTheme] = useState<MenuTheme>("light");
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getcategories());
    setFilteredProducts(products);
  }, []);

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };
  const onFinish = (values: any) => {
    const { name } = values;
    dispatch(getProductsSeach(name));
  };
  const filterCategory = (id: number) => {
    dispatch(getProductsCate(id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <React.Fragment>
      <Sider>
        <Menu
          style={{ width: "100%", height: "100%" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          theme={theme}
          mode="inline"
        >
          <h1
            style={{ marginLeft: 30, color: "red" }}
            onClick={() => filterCategory(0)}
          >
            <PieChartOutlined /> Category
          </h1>
          {categories?.map((cate: any) => {
            return (
              <Menu.Item
                key={cate.id}
                icon={<PieChartOutlined />}
                onClick={() => filterCategory(cate.id)}
              >
                <h5>{cate.name}</h5>
              </Menu.Item>
            );
          })}
          <Divider
            orientation="left"
            orientationMargin="0"
            style={{
              textAlign: "left",
              color: "red",
              width: 300,
              marginLeft: 30,
            }}
          >
            <FormSearch onFinish={onFinish} form={form} />
          </Divider>
          <p style={{ color: "dark", marginLeft: "25px" }}>
            {" "}
            <Switch onChange={changeTheme} style={{ width: "20px" }} />
            Change Style
          </p>
        </Menu>
      </Sider>
      <Content
        style={{
          textAlign: "center",
          minHeight: 120,
          lineHeight: "120px",
          color: "#fff",
        }}
      >
        <Row>
          {(filteredProducts.length === 0 ? products : filteredProducts)?.map(
            (pro: IProduct) => {
              return (
                <Col className="gutter-row" span={6} key={pro.id}>
                  <Image src={pro.image} width={200} />
                  <h2 style={{ marginTop: "-20px" }}>
                    <Link to={"/shop/" + pro.id}>{pro.name}</Link>
                  </h2>
                </Col>
              );
            }
          )}
        </Row>
      </Content>
    </React.Fragment>
  );
};
