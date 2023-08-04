import { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { Button, Divider, Image } from "antd";
import { Link, useParams } from "react-router-dom";
import {
  GitlabOutlined,
  LoadingOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getProduct } from "@/actions/product";
import { addCart } from "@/slices/Cart";

export const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(getProduct(Number(id)));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Content
        style={{
          textAlign: "center",
          minHeight: 120,
          lineHeight: "120px",
          color: "#fff",
        }}
      >
        <div
          className="item"
          style={{ width: "60%", margin: "0px auto 100px auto" }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <Image src={product?.image} width={"100%"} />
            </div>
            <div>
              <Divider
                orientation="left"
                orientationMargin="0"
                style={{ textAlign: "left", color: "red", marginLeft: "30px" }}
              >
                <Link to={"/product/" + product?.id}>
                  <h2>
                    <GitlabOutlined /> {product?.name}
                  </h2>
                </Link>
                <h3>
                  <span style={{ color: "black" }}>
                    <PartitionOutlined />
                  </span>{" "}
                  {product?.price} $
                </h3>
                <Button
                  type="primary"
                  onClick={() => dispatch(addCart({ ...product, quantity: 1 }))}
                >
                  Add To Cart
                </Button>
              </Divider>
            </div>
          </div>
          <p
            style={{
              width: 700,
              textAlign: "left",
              lineHeight: "30px",
              color: "black",
            }}
          >
            <LoadingOutlined /> - {product?.desc}
          </p>
        </div>
      </Content>
    </React.Fragment>
  );
};
