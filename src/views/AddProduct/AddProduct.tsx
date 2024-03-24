import * as React from "react";
import { ProductService } from "../../services/product.service";
import Template from "../Template";
import { Button, Form, type FormProps, Input, InputNumber, Flex } from "antd";
import { FieldType } from "../../interface/product-formtype";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import "./add-product.style.css";

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function AddProduct() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  return (
    <Template>
      <div className="add-product-container">
        {loading && (
          <Flex
            gap="middle"
            align="center"
            justify="center"
            className="loading-container"
          >
            <div>
              <LoadingOutlined />
            </div>
          </Flex>
        )}
        {!loading && (
          <div className="form-container">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={async (values) => {
                try {
                  setLoading(true);
                  await ProductService.createProduct(values);
                  setLoading(false);
                  navigate("/products");
                } catch (error) {
                  console.log(error);
                  setLoading(false);
                }
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: "Please provide a product name" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Price"
                name="price"
                rules={[
                  {
                    type: "number",
                    required: true,
                    message: "Please provide a product price",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item<FieldType>
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    type: "number",
                    required: true,
                    message: "Please provide a product quantity",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item<FieldType>
                label="Category ID"
                name="categoryID"
                initialValue={1}
                rules={[
                  {
                    required: true,
                    message: "Please provide a product category ID",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </Template>
  );
}
