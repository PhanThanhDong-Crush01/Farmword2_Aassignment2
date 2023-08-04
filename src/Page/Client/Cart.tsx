import { useAppDispatch, useAppSelector } from "@/app/hook";
import { decreaseCart, deleteCart, increaseCart } from "@/slices/Cart";
import {
  MinusSquareOutlined,
  PlusSquareOutlined,
  RestOutlined,
} from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { addCart } from "@/slices/Cart";
import { persistor } from "@/app/store";

const Cart = () => {
  const cart = useAppSelector((state: any) => state.cart.items);
  const dispatch = useAppDispatch();
  let Total = 0;

  useEffect(() => {
    const restoreCart = async () => {
      await persistor.persist();
      const restoredCart = persistor.getState().cart.items;
      dispatch(addCart(restoredCart));
    };

    restoreCart();
  }, [dispatch]);

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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <h3 style={{ color: "red" }}>$ {record.price}</h3>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Money",
      key: "money",
      render: (_, record) => (
        <h3 style={{ color: "red" }}>$ {record.price * record.quantity}</h3>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => dispatch(increaseCart(record.id))}
          >
            <PlusSquareOutlined /> Increase
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => dispatch(decreaseCart(record.id))}
          >
            <MinusSquareOutlined /> Decrease
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => dispatch(deleteCart(record.id))}
          >
            <RestOutlined /> Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div style={{ margin: "0 auto", width: 1300 }}>
        <h1>Cart</h1>
        {cart.length == 0 ? (
          "There is nothing in the cart, please return to the shop page to order"
        ) : (
          <Table columns={columns} dataSource={cart} />
        )}
        <h1>
          Total:
          <span style={{ color: "red", fontWeight: 900, fontSize: 30 }}>
            ${cart.map((item: any) => (Total += item.price * item.quantity))}
          </span>
        </h1>
      </div>
    </React.Fragment>
  );
};

export default Cart;
