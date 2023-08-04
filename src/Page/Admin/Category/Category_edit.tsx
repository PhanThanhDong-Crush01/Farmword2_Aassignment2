import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getcategoryOne, updatecategory } from "@/actions/categories";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const AdminCategoryEdit = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { categoryOne } = useAppSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(getcategoryOne(Number(id)));
  }, []);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      id: categoryOne?.id,
      name: categoryOne?.name,
    });
  };

  useEffect(() => {
    setFields();
  }, [categoryOne]);

  const onFinish = (values: any) => {
    dispatch(updatecategory(values));
    alert("Edit successfully");
    navigate("/admin/category");
  };

  return (
    <React.Fragment>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 900 }}
      >
        <h1>Category Edit</h1>
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
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};
