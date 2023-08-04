import { addcategory } from "@/actions/categories";
import { useAppDispatch } from "@/app/hook";
import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const AdminCategoryAdd = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(addcategory(values));
    alert("Add successfully");
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
        <h1>Category Add</h1>
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
