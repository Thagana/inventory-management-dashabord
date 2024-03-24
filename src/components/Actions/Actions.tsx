import { Link } from "react-router-dom";
import { Space, Button } from "antd";
import { Product } from "../../interface/product";
import { ProductService } from "../../services/product.service";

type Props = {
  productID: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function Actions(props: Props) {
  const { productID, setLoading, setProducts } = props;
  return (
    <Space size="middle">
      <Link to={`/products/view?productID=${productID}`}>View Item</Link>
      <Button
        onClick={async () => {
          try {
            setLoading(true);
            const products = await ProductService.deleteProduct(productID);
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
  );
}
