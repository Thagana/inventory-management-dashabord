import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Template from "../Template";
import { Table, Tag, Space } from "antd";
import type { TableProps } from "antd";
import { ProductService } from "../../services/product.service";
import { Product } from "../../interface/product";
import { Button } from "antd/es/radio";
import "./products.style.css";

export default function Products() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const columns: TableProps<Product>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Avilability",
      key: "availability",
      dataIndex: "availability",
      render: (_, record) => {
        let color = "green";
        if (record.availability === "Out of Stock") {
          color = "red";
        }
        return <Tag color={color}>{record.availability.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/products/view?productID=${record.productID}`}>
            View Item
          </Link>
          <Button
            onClick={async () => {
              try {
                setLoading(true);
                const products = await ProductService.deleteProduct(
                  record.productID,
                );
                setLoading(false);
                setProducts(products);
              } catch (error) {
                console.log(error);
                setLoading(false);
              }
            }}
          >
            Delete Item
          </Button>
        </Space>
      ),
    },
  ];

  React.useEffect(() => {
    setLoading(true);
    ProductService.getProducts()
      .then((res) => {
        setProducts(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Template>
      <div className="header">
        <Button
          onClick={() => {
            navigate("/products/add");
          }}
        >
          Add
        </Button>
        <Button
          onClick={() => {
            // handle export data
          }}
        >
          Export
        </Button>
      </div>
      <Table columns={columns} dataSource={products} loading={loading} />
    </Template>
  );
}
