import React, { useState, useEffect } from "react";
import { getProducts, updateProduct } from "../utility/api";
import AddProduct from "../pages/AddProduct";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductView, setIsAddProductView] = useState(false);

  const refreshProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleAddProductSuccess = () => {
    setIsAddProductView(true);
    refreshProducts();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      refreshProducts();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="container">
      <h1>Product Dashboard</h1>

      {isAddProductView ? (
        <div>
          <AddProduct
            refreshProducts={refreshProducts}
            onSuccess={handleAddProductSuccess}
          />
        </div>
      ) : (
        <div>
          <button className="addbtn" onClick={() => setIsAddProductView(true)}>
            Add Product
          </button>
          <ProductList
            products={products}
            refreshProducts={refreshProducts}
            setEditingProduct={setEditingProduct}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
