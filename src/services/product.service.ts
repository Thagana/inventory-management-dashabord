import axios from "../networking/adaptor";
import { Product } from "../interface/product";
import { FieldType } from "../interface/product-formtype";

export class ProductService {
  static async getProducts() {
    return new Promise<Product[]>((resolve, reject) => {
      axios
        .get("http://localhost:3000/products")
        .then((response) => {
          console.log(response);
          if (!response.data.success) {
            reject(response.data.message);
          } else {
            resolve(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static async getProductByID(productID: string) {
    return new Promise<Product>((resolve, reject) => {
      axios
        .get(`http://localhost:3000/products/${productID}`)
        .then((response) => {
          if (!response.data.success) {
            reject(response.data.message);
          } else {
            resolve(response.data.data);
          }
        })
        .catch((error) => {
          console.log("Error Service:", error);
          reject(error);
        });
    });
  }

  static async deleteProduct(productID: string) {
    return new Promise<Product[]>((resolve, reject) => {
      axios
        .delete(`http://localhost:3000/products/${productID}`)
        .then((response) => {
          if (!response.data.success) {
            reject(response.data.message);
          } else {
            resolve(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static async createProduct(values: FieldType) {
    return new Promise<Product>((resolve, reject) => {
      axios
        .post("http://localhost:3000/products", {
          ...values,
        })
        .then((response) => {
          if (!response.data.success) {
            reject(response.data.message);
          } else {
            resolve(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static async updateProduct(values: FieldType) {
    return new Promise((resolve, reject) => {
      axios
        .put("http://localhost:3000/products", {
          ...values,
        })
        .then((response) => {
          if (!response.data.success) {
            reject(response.data.message);
          } else {
            resolve(response.data.data);
          }
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
    });
  }
}
