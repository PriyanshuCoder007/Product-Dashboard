import React, { useState, useEffect } from "react";
import { getProducts, updateProduct } from "../utility/api";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div className="container">
      <h1>Product Dashboard</h1>

      <div>
        <button className="addbtn" onClick={() => navigate("/add-product")}>
          Add Product
        </button>
        {!loading && (
          <ProductList products={products} refreshProducts={refreshProducts} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
