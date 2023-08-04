import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getProduct, updateProduct } from "@/actions/product";
import { getcategories } from "@/actions/categories";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const AdminProductEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state: any) => state.products);
  const { categories } = useAppSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(getProduct(Number(id)));
    dispatch(getcategories());
  }, [dispatch]);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      id: product?.id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
      desc: product?.desc,
      categoryId: product?.categoryId,
    });
  };

  useEffect(() => {
    setFields();
  }, [product]);

  const onFinish = (values: any) => {
    dispatch(updateProduct(values));
    alert("Edit successfully");
    navigate("/admin/product");
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <React.Fragment>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 900, textAlign: "right" }}
      >
        <h1>Product Edit</h1>
        <Form.Item
          name="id"
          rules={[{ required: true }]}
          style={{ display: "none" }}
        >
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="Desc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a option category" allowClear>
            {categories?.map((cate: any) => {
              return <Option value={cate.id}>{cate.name}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};
