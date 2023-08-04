import { Alert, Spin } from "antd";
import React from "react";

export const DarhBoash = () => {
    return (
        <React.Fragment>
            <Spin tip="Loading...">
            </Spin>
            <Alert
                message="Loading DarhBoash"
                description="Further details about the context of this alert."
                type="info"
            />
        </React.Fragment>
    )
}