import React, { useEffect, useState } from "react";
import { Space, Table, Button, Image, Menu, Form, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import {
  DownCircleOutlined,
  PlusOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { IProduct } from "@/interfaces/IProduct";
import { ICategory } from "@/interfaces/ICategory";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  deleteProduct,
  getProducts,
  getProductsCate,
  getProductsSeach,
  sortProducts,
} from "@/actions/product";
import { getcategories } from "@/actions/categories";
import { FormSearch } from "@/components/FormSearch";

export const AdminProducts = () => {
  const dispatch = useAppDispatch();
  let { products, isLoading, error } = useAppSelector(
    (state: any) => state.products
  );
  console.log(
    "🚀 ~ file: Products.tsx:26 ~ AdminProducts ~ products:",
    products
  );
  const categories = useAppSelector(
    (state: any) => state.categories.categories
  );
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getcategories());
    setFilteredProducts(products);
  }, []);

  const onFinish = (values: any) => {
    const { name } = values;
    dispatch(getProductsSeach(name));
  };

  const columns: ColumnsType<any> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image width={200} src={image} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <h3 style={{ color: "red" }}>{record.price}</h3>,
    },
    {
      title: "Desc",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Category",
      dataIndex: "cateName",
      key: "cateName",
      render: (_, record) => <p style={{ color: "blue" }}>{record.cateName}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={() => dispatch(deleteProduct(record.id))}
          >
            Delete
          </Button>
          <Link to={"/admin/product/" + record.id + "/edit"}>
            <Button type="primary">Edit</Button>
          </Link>
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>
          Products
          <Link to={"/admin/product/add"}>
            <Button
              type="primary"
              shape="circle"
              style={{ width: 15, marginLeft: 20 }}
            >
              <PlusOutlined />
            </Button>
          </Link>
          <span
            style={{ fontSize: 25, margin: "0 20px" }}
            onClick={() => dispatch(sortProducts(true))}
          >
            <UpCircleOutlined />
          </span>
          <span
            style={{ fontSize: 25 }}
            onClick={() => dispatch(sortProducts(false))}
          >
            <DownCircleOutlined />
          </span>
        </h1>
        <Menu style={{ display: "flex", fontSize: "12px" }}>
          <Menu.Item key={0} style={{ paddingBottom: "50px" }}>
            <p
              style={{ color: "red" }}
              onClick={() => dispatch(getProductsCate(0))}
            >
              All
            </p>
          </Menu.Item>
          {categories.map((cate: ICategory) => {
            return (
              <Menu.Item
                key={cate.id}
                onClick={() => dispatch(getProductsCate(cate.id))}
                style={{ paddingBottom: "50px" }}
              >
                <p style={{ color: "gray" }}>{cate.name}</p>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      <Divider
        orientation="left"
        orientationMargin="0"
        style={{ textAlign: "left", color: "red" }}
      >
        <FormSearch onFinish={onFinish} form={form} />
      </Divider>
      <Table
        columns={columns}
        dataSource={filteredProducts.length === 0 ? products : filteredProducts}
      />
    </React.Fragment>
  );
};
