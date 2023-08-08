import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, QRCode, Spin, Watermark } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";

export const HomePage = () => {
  const [size, setSize] = useState<number>(160);

  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 10;
      if (newSize > 300) {
        return 300;
      }
      return newSize;
    });
  };

  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 10;
      if (newSize < 48) {
        return 48;
      }
      return newSize;
    });
  };
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
        <Button.Group style={{ marginBottom: 16 }}>
          <Button
            onClick={decline}
            disabled={size <= 48}
            icon={<MinusOutlined />}
          >
            Smaller
          </Button>
          <Button
            onClick={increase}
            disabled={size >= 300}
            icon={<PlusOutlined />}
          >
            Larger
          </Button>
        </Button.Group>
        <QRCode
          style={{ margin: "0 auto" }}
          errorLevel="H"
          size={size}
          iconSize={size}
          value="../../../public/mbbank.jpg"
          icon="../../../public/mbbank.jpg"
        />
      </Content>
    </React.Fragment>
  );
};
