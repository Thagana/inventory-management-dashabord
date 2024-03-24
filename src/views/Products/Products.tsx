import * as React from "react";
import { useNavigate } from "react-router-dom";
import Template from "../Template";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { ProductService } from "../../services/product.service";
import { Product } from "../../interface/product";
import { Button } from "antd/es/radio";
import "./products.style.css";
import Actions from "../../components/Actions";

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
        console.log(record.availability);
        if (record.availability === "Out Of Stock") {
          color = "red";
        }
        return <Tag color={color}>{record.availability.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Actions
          productID={record.productID}
          setLoading={setLoading}
          setProducts={setProducts}
        />
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
          onClick={async () => {
            const products = await ProductService.getProducts();
            const fileName = `export-${new Date()}`;

            const json = JSON.stringify(products, null, 2);

            const blob = new Blob([json], { type: "application/json" });

            const href = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = href;
            link.download = fileName + ".json";
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
          }}
        >
          Export
        </Button>
      </div>
      <Table columns={columns} dataSource={products} loading={loading} />
    </Template>
  );
}
