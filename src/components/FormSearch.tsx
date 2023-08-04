import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout } from "antd";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface Form {
  onFinish: any;
  form: any;
}
export const FormSearch = (props: Form) => {
  return (
    <>
      <Form
        {...Layout}
        form={props.form}
        name="control-hooks"
        onFinish={props.onFinish}
        style={{ maxWidth: 110, display: "flex", marginBottom: "30px" }}
      >
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Search name " />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "-60px" }}
          >
            <SearchOutlined />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
