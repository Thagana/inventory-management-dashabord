import * as React from "react";
import { Form, InputNumber, Input, Button, notification } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import { ProductService } from "../../services/product.service";

import { Product } from "../../interface/product";

import Template from "../Template";

import { FieldType } from "../../interface/product-formtype";

import "./view.style.css";

export default function View() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = React.useState<Product>();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const url = searchParams.get("productID") || "";
    setLoading(true);
    ProductService.getProductByID(url)
      .then((response) => {
        setProduct(response);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.log("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Template>
      <div className="product-view-conatiner">
        <div className="laoding-container">
          {loading && <LoadingOutlined />}
        </div>
        {product && !loading && (
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={async (values) => {
              try {
                setLoading(true);
                const data = { ...values, productID: product.productID };
                await ProductService.updateProduct(data);
                setLoading(false);
                navigate("/products");
              } catch (error) {
                notification.error({
                  message: "Something went wrong, please try again later",
                });
                setLoading(false);
              }
            }}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Product Name"
              name="name"
              initialValue={product.name}
              rules={[
                { required: true, message: "Please provide a product name" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Price"
              name="price"
              initialValue={product.price}
              rules={[
                {
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
              initialValue={product.quantity}
              rules={[
                {
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
              initialValue={product.categoryID}
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
              <Button htmlType="submit">Update</Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Template>
  );
}
