import React, { useEffect } from "react";
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { deletecategory, getcategories } from "@/actions/categories";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { ICategory } from "@/interfaces/ICategory";
import { getProducts } from "@/actions/product";

export const AdminCategories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getcategories());
  }, []);

  const columns: ColumnsType<ICategory> = [
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => dispatch(deletecategory(record.id))}>
            Delete
          </Button>
          <Link to={"/admin/category/" + record.id + "/edit"}>
            <Button type="primary">Edit</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Categories</h1>
        <Link to={"/admin/category/add"}>
          <Button type="primary" shape="circle">
            <PlusOutlined />
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={categories} />
    </React.Fragment>
  );
};
