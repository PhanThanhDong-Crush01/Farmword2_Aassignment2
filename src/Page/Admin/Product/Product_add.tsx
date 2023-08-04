import { getcategories } from '@/actions/categories';
import { addProduct } from '@/actions/product';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


export const AdminProductAdd = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state: any) => state.categories);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getcategories());
    }, []);

    const onFinish = (values: any) => {
        dispatch(addProduct(values))
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
                <h1>Product Add</h1>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="image" label="Image" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                {/* <Upload {...upFile}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload> */}
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber prefix="$" style={{ width: '100%' }} min={1} />
                </Form.Item>
                <Form.Item name="desc" label="Desc" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
                    <Select placeholder="Select a option category" allowClear>
                        {categories?.map((cate:any) => {
                            return (
                                <Option value={cate.id}>{cate.name}</Option>
                            )
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
    )
}