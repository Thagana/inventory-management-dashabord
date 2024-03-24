import * as React from "react";
import { Flex } from "antd";
import Button from "antd/es/button";
import { useNavigate } from "react-router-dom";

export default function PageNotfound(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Flex gap="middle" align="center" vertical justify="center">
      <div>
        <div>Page Not Found</div>
        <Button
          onClick={() => {
            navigate("/products");
          }}
        >
          Go To Products
        </Button>
      </div>
    </Flex>
  );
}
