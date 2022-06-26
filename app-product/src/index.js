import React from "react";
import { ProductService } from "@ts/utils";

const ProductContext = new React.createContext();

const ProductProvider = ({ children }) => {
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    function update(data) {
      setProduct(data);
    }

    ProductService.subscribe(update);
  }, []);

  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
};

const App = () => {
  const product = React.useContext(ProductContext);
  if (!product) return null;
  return (
    <>
      <div>
        <button type="button" class="ant-btn ant-btn-primary">
          <span>
            We apply exactly antd class here to show that the antd style not
            effected to another micro-app
          </span>
        </button>
      </div>
      <div>{product.description}</div>
    </>
  );
};

export default function Root(props) {
  return (
    <ProductProvider>
      <App />
    </ProductProvider>
  );
}
