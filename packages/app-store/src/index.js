/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Spin, Button } from "antd";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./index.css";
import { ProductService } from "@ts/utils";

const ProductList = () => {
  const { data, isLoading } = useQuery("products", () =>
    fetch("https://fakestoreapi.com/products?limit=10").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div class="flex flex-row gap-2 flex-wrap">
      {data.map((product) => {
        return (
          <div key={product.id} class="border border-black p-2">
            <img
              width={100}
              src={product.image}
              alt={product.description}
              onClick={() => {
                ProductService.update(product);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <Link to="/test" className="pr-2">
        Test Style
      </Link>
      {"/"}
      <Link to="/products" className="pl-2">
        Show Products
      </Link>
    </div>
  );
};

const Root = () => {
  return (
    <BrowserRouter basename="react">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="" element={<App />} />
          <Route path="/products" element={<ProductList />} />
          <Route
            path="/test"
            element={
              <>
                <div>Button with ANTD Style</div>
                <Button type="primary">Primary</Button>
              </>
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Root;
