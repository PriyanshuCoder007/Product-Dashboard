import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../utility/api";

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [addpd, setAddPD] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error("Failed to delete product:", error.message);
        setError("Failed to delete product. Please try again.");
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Product List</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Image
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Price
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Description
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.title}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <img
                    src={product.image || "https://via.placeholder.com/50"} // Placeholder if image is missing
                    alt={product.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${product.price}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.description}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => onEdit(product)}
                    style={{
                      padding: "5px 10px",
                      marginRight: "5px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
