import { Spin, Watermark } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

export const HomePage = () => {
    return (
        <React.Fragment>
            <Content style={{
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: '#fff',
            }}>
                <Spin tip="Loading...">
                    <Watermark
                        height={30}
                        width={130}
                        image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
                    >
                        <div style={{ height: 570 }} />
                    </Watermark>
                </Spin>
            </Content>
        </React.Fragment>
    )
}